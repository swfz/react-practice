import React, { ChangeEvent, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import Chart from 'react-google-charts';
import { AppBar, Button, Grid, TextField } from '@material-ui/core';
import * as moment from 'moment';
import IdInput from './components/idInput';
import { DetailResponse } from './api/detail';
import DateInput from "./components/dateInput";
import EndDateContainer from "./containers/endDate";
import StartDateContainer from "./containers/startDate";

type InputParams = {
  key: string;
  ids: string[];
  startDate: string;
  endDate: string;
};

type IdsInput = {
  index: number;
  value: string;
};

const App: React.FC = () => {
  const initialParams = {
    key: '',
    ids: [],
    startDate: '',
    endDate: '',
  };
  const [params, setParams] = useState<InputParams>(initialParams);
  const [requestParams, setRequestParams] = useState<InputParams>(
    initialParams
  );
  const [idsInput, setIdsInput] = useState<IdsInput[]>([
    { index: 0, value: '' },
  ]);
  const [record, setRecord] = useState<DetailResponse['data']>([]);
  const [graphData, setGraphData] = useState();

  const searchButtonClick = () => {
    setRequestParams(params);
  };

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

    const data = Object.keys(hash).sort().reduce((acc, d) => {
      const projectTimes = projects.map(p => hash[d][p]||0);
      acc.push([d].concat(projectTimes));

      return acc;
    }, [['date'].concat(projects)]);

    console.log(data);
    setGraphData(data);

    return () => setGraphData([[]]);
  }, [record]);

  const requestUrl = (requestParams: InputParams, workspaceId: string, page: number) => {
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

  const getData = (
    workspaceId: string,
    page: number
  ): Promise<DetailResponse['data']> => {
    const url = requestUrl(requestParams, workspaceId, page);
    const init = requestHeader(requestParams);

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
  };

  useEffect(() => {
    if (!requestParams.key) {
      return;
    }

    const dataByWorkspace = requestParams.ids.map(id => getData(id, 1));
    Promise.all(dataByWorkspace).then((results: DetailResponse["data"][]) => {
        setRecord(results.flat(1))
      });
  }, [requestParams]);

  const addIdInput = () => {
    setIdsInput(cur => cur.concat([{ index: cur.length, value: '' }]));
  };

  const keyChangeFn = (e: ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, key: e.target.value });
  };
  const startChangeFn = (e: ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, startDate: e.target.value });
  };
  const endChangeFn = (e: ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, endDate: e.target.value });
  };

  const partialChangeIdInput = (index: number) => {
    console.log('load partialChageIdInput');
    return (e: ChangeEvent<HTMLInputElement>) => {
      const id = e.target.value;
      idsInput[index].value = id;
      setIdsInput(idsInput);
      const ids = idsInput.map(kv => kv.value);
      setParams({ ...params, ids: ids });
    };
  };

  return (
    <div>
      <AppBar position="static">Toggl Reporter</AppBar>
      <br />
      <Grid container direction="column" justify="space-around" spacing={4}>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" spacing={4}>
            <Grid item xs={2}>
              <TextField
                onChange={keyChangeFn}
                label="API Key"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <StartDateContainer onChange={startChangeFn} />
            </Grid>
            <Grid item xs={2}>
              <EndDateContainer onChange={endChangeFn} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={1}>
              <Button onClick={addIdInput} variant="outlined" color="default">
                +
              </Button>
            </Grid>
            {idsInput.map(kv => {
              return (
                <Grid item xs={2}>
                  <IdInput
                    key={kv.index}
                    index={kv.index}
                    onChange={partialChangeIdInput(kv.index)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={searchButtonClick}
              variant="outlined"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <hr />

      <Chart
        width={'800px'}
        height={'500px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={graphData}
        options={{
          isStacked: true
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  );
};

export default hot(module)(App);
