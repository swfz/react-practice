import React, {useEffect, useRef, useState} from 'react';
import { hot } from 'react-hot-loader';

type InputParams = {
  key: string;
  ids: string[];
};
const App: React.FC = () => {
  const initialParams = {
    key: '',
    ids: []
  };
  const [apiKey, setApiKey] = useState('');
  const [workspaceIds, setWorkspaceIds] = useState([]);
  const [params, setParams] = useState<InputParams>(initialParams);

  const apiKeyElem = useRef<HTMLInputElement>(null);
  const workspaceIdElem = useRef<HTMLInputElement>(null);


  const searchButtonClick = () => {
    console.log('click');
    if (apiKeyElem.current && workspaceIdElem.current) {
      console.log(apiKeyElem.current.value);
      console.log(workspaceIdElem.current.value);
      setParams({key: apiKeyElem.current.value, ids: [workspaceIdElem.current.value]});
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
      headers: header
    };
    fetch(url, init).
    then(res => {
      return res.json();
    }).then((json) => {
      console.log(json);
    });
  }, [params]);

  return <div>
    <div>API Key</div>
    <input ref={apiKeyElem} type="text"/>

    <div>Workspace IDs</div>
    <input ref={workspaceIdElem} type="text"/>
    <button>+</button>

    <hr/>
    <button onClick={searchButtonClick}>Click</button>
    <h1>Hello React!</h1>
  </div>;
};

const IdsInput = () => {
  return <input />
}

export default hot(module)(App);
