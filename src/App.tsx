import React, { ChangeEvent, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import Chart from 'react-google-charts';

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
    endDate: ''
  };
  const [params, setParams] = useState<InputParams>(initialParams);
  const [requestParams, setRequestParams] = useState<InputParams>(
    initialParams
  );
  const [idsInput, setIdsInput] = useState<IdsInput[]>([
    { index: 0, value: '' },
  ]);

  const searchButtonClick = () => {
    setRequestParams(params);
  };

  useEffect(() => {
    if (!requestParams.key) {
      return;
    }

    const startDate = requestParams.startDate;
    const endDate = requestParams.endDate;
    const url = `https://toggl.com/reports/api/v2/details.json?workspace_id=${requestParams.ids[0]}&since=${startDate}&until=${endDate}&user_agent=client`;
    const authString = btoa(`${requestParams.key}:api_token`);
    console.log('params-----------------');
    console.log(requestParams);
    console.log('params-----------------');
    const header = new Headers();
    header.set('Authorization', `Basic ${authString}`);
    const init = {
      method: 'GET',
      headers: header,
    };
    fetch(url, init)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
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
      <div>API Key</div>
      <input onChange={keyChangeFn} type="text" />

      <div>Start Date</div>
      <input onChange={startChangeFn} type="date" />

      <div>End Date</div>
      <input onChange={endChangeFn} type="date" />

      <div>Workspace IDs</div>
      <button onClick={addIdInput}>+</button>
      <br />
      {idsInput.map(kv => {
        return <IdInput key={kv.index} index={kv.index} onChange={partialChangeIdInput(kv.index)}/>;
      })}

      <button onClick={searchButtonClick}>Click</button>
      <hr />

      <Chart
             chartType="ScatterChart"
             data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
             width="100%"
             height="400px"
             legendToggle
      >
      </Chart>
    </div>
  );
};

const IdInput = (props: { index: number, onChange: (e:  ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div>
      <span>{props.index + 1}</span>
      <input onChange={props.onChange} type="text" />
    </div>
  );
};

export default hot(module)(App);
