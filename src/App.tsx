import React, { ChangeEvent, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import Chart from 'react-google-charts';
import { AppBar, Button, Grid, TextField } from '@material-ui/core';
import * as moment from 'moment';
import IdInput from './components/idInput';

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
  const startDefault = moment
    .default()
    .subtract(8, 'day')
    .format('YYYY-MM-DD');
  const endDefault = moment
    .default()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

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
              <TextField
                onChange={startChangeFn}
                label="Start Date"
                defaultValue={startDefault}
                type="date"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={endChangeFn}
                label="End Date"
                defaultValue={endDefault}
                type="date"
              />
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
          width={'500px'}
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Year', 'Sales', 'Expenses', 'Profit'],
            ['2014', 1000, 400, 200],
            ['2015', 1170, 460, 250],
            ['2016', 660, 1120, 300],
            ['2017', 1030, 540, 350],
          ]}
          options={{
            // Material design options
            chart: {
              title: 'Company Performance',
              subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
      />

    </div>
  );
};

export default hot(module)(App);
