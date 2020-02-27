import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, CardActions, CardContent, Grid, TextField} from '@material-ui/core';
import StartDateInputContainer from './startDate';
import EndDateInputContainer from './endDate';
import WorkSpaceIdInputContainer from './workspaceIdInput';
type InputParams = {
  key: string;
  ids: string[];
  startDate: string;
  endDate: string;
};

const FormContainer = (props: {setRequestParams: Dispatch<SetStateAction<InputParams>>}) => {
  const initialParams = {
    key: '',
    ids: [],
    startDate: '',
    endDate: '',
  };
  const [params, setParams] = useState<InputParams>(initialParams);

  const inputHandler = (key: 'key' | 'startDate' | 'endDate') => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const keyHash = { [key]: e.target.value };
      setParams({ ...params, ...keyHash });
    };
  };
  const searchButtonClick = () => {
    props.setRequestParams(params);
  };

  return <Card>
    <CardContent>
      <Grid container direction="column" justify="space-around" spacing={4}>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" spacing={4}>
            <Grid item xs={2}>
              <TextField
                  onChange={inputHandler('key')}
                  label="API Key"
                  type="password"
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <StartDateInputContainer onChange={inputHandler('startDate')}/>
            </Grid>
            <Grid item xs={2}>
              <EndDateInputContainer onChange={inputHandler('endDate')}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <WorkSpaceIdInputContainer setParams={setParams}/>
        </Grid>
      </Grid>
    </CardContent>
    <CardActions>
      <Button
          onClick={searchButtonClick}
          variant="outlined"
          color="primary"
      >
        Search
      </Button>
    </CardActions>
  </Card>
};

export default FormContainer;
