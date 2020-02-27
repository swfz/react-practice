import React, { useCallback, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { AppBar } from '@material-ui/core';
import FormContainer, { initialParams, InputParams } from './containers/form';
import ChartContainer from './containers/chart';

const App: React.FC = () => {
  const [requestParams, setRequestParams] = useState<InputParams>(
    initialParams
  );

  return (
    <div>
      <AppBar position="static">Toggl Reporter</AppBar>
      <br />

      <FormContainer setRequestParams={setRequestParams} />

      <br />
      <ChartContainer requestParams={requestParams} />
    </div>
  );
};

const Counter = () => {
  const [like, setLike] = useState(0);
  console.log('render counter');

  // 上は`like`の値が定義された瞬間の値`0`で固定されてしまうのでボタンを押しまくってもカウントが上がらない
  // const handleLike = useCallback(() => setLike(like + 1), []);
  const handleLike = useCallback(() => setLike(cur => cur + 1), []);

  return (
    <>
      <button onClick={handleLike}>Up!</button>
      <div>Count:</div>
      <div>{like}</div>
    </>
  );
};

export default hot(module)(App);
