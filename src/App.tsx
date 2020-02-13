import React, {useCallback, useRef, useState, useEffect} from 'react';
import {hot} from 'react-hot-loader';

const App: React.FC = () => {

  console.log('render app');
  return <div>
    <h1>Hello React!</h1>
    <Counter/>
  </div>;
};

const Counter = () => {
  const [like, setLike] = useState(0);
  console.log('render counter');

  // 上は`like`の値が定義された瞬間の値`0`で固定されてしまうのでボタンを押しまくってもカウントが上がらない
  // const handleLike = useCallback(() => setLike(like + 1), []);
  const handleLike = useCallback(() => setLike((cur) => cur + 1), []);

  return <>
    <button onClick={handleLike}>Up!</button>
    <div>Count:</div>
    <div>{like}</div>
    </>
};

export default hot(module)(App);
