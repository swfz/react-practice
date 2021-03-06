import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { DetailResponse } from '../api/detail';
import { InputParams } from './form';

const ChartContainer = (props: { requestParams: InputParams }) => {
  const [record, setRecord] = useState<DetailResponse['data']>([]);
  const [graphData, setGraphData] = useState();
  const calculate = (duration: number) => {
    return Math.round((duration / 1000 / 60 / 60) * 100.0) / 100;
  };
  useEffect(() => {
    console.log('called change record effect');
    console.log(record);
    console.log('called change record effect');
    const projects = Array.from(new Set(record.map(r => r.project)));
    const hash = record.reduce((acc: any, cur) => {
      const date = cur.start.split('T')[0];
      if (!acc[date]) {
        acc[date] = {};
      }
      if (!acc[date][cur.project]) {
        acc[date][cur.project] = 0;
      }

      acc[date][cur.project] += calculate(cur.dur);

      return acc;
    }, {});
    console.log(hash);

    const data = Object.keys(hash)
      .sort()
      .reduce(
        (acc, d) => {
          const projectTimes = projects.map(p => hash[d][p] || 0);
          acc.push([d].concat(projectTimes));

          return acc;
        },
        [['date'].concat(projects)]
      );

    console.log(data);
    setGraphData(data);

    return () => setGraphData([[]]);
  }, [record]);

  const requestUrl = (
    requestParams: InputParams,
    workspaceId: string,
    page: number
  ) => {
    const startDate = requestParams.startDate;
    const endDate = requestParams.endDate;
    const url = `https://toggl.com/reports/api/v2/details.json?page=${page}&workspace_id=${workspaceId}&since=${startDate}&until=${endDate}&user_agent=client`;
    console.log('params-----------------');
    console.log(requestParams);
    console.log('params-----------------');

    return url;
  };

  const requestHeader = (requestParams: InputParams) => {
    const authString = btoa(`${requestParams.key}:api_token`);
    const header = new Headers();
    header.set('Authorization', `Basic ${authString}`);

    return {
      method: 'GET',
      headers: header,
    };
  };

  const getData = (workspaceId: string, page: number): Promise<DetailResponse['data']> => {
    const url = requestUrl(props.requestParams, workspaceId, page);
    const init = requestHeader(props.requestParams);

    return fetch(url, init)
        .then(res => {
          return res.json();
        })
        .then(async (json: DetailResponse) => {
          const totalRows = json.total_count;
          const cursor = (page - 1) * json.per_page + json.data.length;
          if (cursor < totalRows) {
            return json.data.concat(await getData(workspaceId, page + 1));
          } else {
            return json.data;
          }
        });
  }

  useEffect(() => {
    if (!props.requestParams.key) {
      return;
    }

    const dataByWorkspace = props.requestParams.ids.map(id => getData(id, 1));
    Promise.all(dataByWorkspace).then((results: DetailResponse['data'][]) => {
      setRecord(results.flat(1));
    });
  }, [props.requestParams]);

  return <>
      <Chart
        width={'800px'}
        height={'500px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={graphData}
        options={{
          isStacked: true,
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
      />
  </>
};

export default ChartContainer;
