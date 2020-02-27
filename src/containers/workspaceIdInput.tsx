import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import IdInput from '../components/idInput';
import { InputParams } from './form';

type IdsInput = {
  index: number;
  value: string;
};

const WorkSpaceIdInputContainer = (props: { setParams: Dispatch<SetStateAction<InputParams>> }) => {
  const [idsInput, setIdsInput] = useState<IdsInput[]>([
    { index: 0, value: '' },
  ]);

  const addIdInput = () => {
    setIdsInput(cur => cur.concat([{ index: cur.length, value: '' }]));
  };
  const partialChangeIdInput = (index: number) => {
    console.log('load partialChageIdInput');
    return (e: ChangeEvent<HTMLInputElement>) => {
      const id = e.target.value;
      idsInput[index].value = id;
      setIdsInput(idsInput);
      const ids = idsInput.map(kv => kv.value);
      props.setParams((params: InputParams) => ({ ...params, ids: ids }));
    };
  };

  return <Grid container direction="row" justify="flex-start" alignItems="center">
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
};

export default WorkSpaceIdInputContainer;
