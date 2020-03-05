import React, {useCallback, useState} from 'react';

const CounterContainer = () => {
  const [like, setLike] = useState(0);
  console.log('render counter');

  // 上は`like`の値が定義された瞬間の値`0`で固定されてしまうのでボタンを押しまくってもカウントが上がらない
  // const handleLike = useCallback(() => setLike(like + 1), []);
  const handleLike = useCallback(() => setLike(cur => cur + 1), []);

  return (
    <>
      <h2>Counter</h2>
      <button onClick={handleLike}>Up!</button>
      <div>Count:</div>
      <div>{like}</div>
    </>
  );
};

export default CounterContainer;
