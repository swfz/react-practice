import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import { hot } from 'react-hot-loader';

type InputParams = {
  key: string;
  ids: string[];
};

type IdsInput = {
  index: number;
  value: string;
};

const App: React.FC = () => {
  const initialParams = {
    key: '',
    ids: [],
  };
  const [params, setParams] = useState<InputParams>(initialParams);
  const [idsInput, setIdsInput] = useState<IdsInput[]>([
    { index: 0, value: '' },
  ]);

  const apiKeyElem = useRef<HTMLInputElement>(null);

  const searchButtonClick = () => {
    console.log('click--------------------');
    console.log(idsInput);
    console.log('click--------------------');
    const ids = idsInput.map(kv => kv.value);
    if (apiKeyElem.current) {
      setParams({
        key: apiKeyElem.current.value,
        ids: ids,
      });
    }
  };

  useEffect(() => {
    const startDate = '2020-02-17';
    const endDate = '2020-02-17';
    const url = `https://toggl.com/reports/api/v2/details.json?workspace_id=${params.ids[0]}&since=${startDate}&until=${endDate}&user_agent=client`;
    const authString = btoa(`${params.key}:api_token`);
    console.log(params);
    console.log(authString);
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
  }, [params]);

  const addIdInput = () => {
    setIdsInput(cur => cur.concat([{ index: cur.length, value: '' }]));
  };

  const partialChangeIdInput = (index: number) => {
    console.log('load partialChageIdInput');
    return (e: ChangeEvent<HTMLInputElement>) => {
      idsInput[index].value = e.target.value;
      setIdsInput(idsInput);
    };
  };

  return (
    <div>
      <div>API Key</div>
      <input ref={apiKeyElem} type="text" />

      <div>Workspace IDs</div>
      <button onClick={addIdInput}>+</button>
      <br />
      {idsInput.map(kv => {
        return <IdInput index={kv.index} onChange={partialChangeIdInput(kv.index)}/>;
      })}

      <hr />
      <button onClick={searchButtonClick}>Click</button>
      <h1>Hello React!</h1>
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
