import React, {useState} from 'react';
import FormContainer, {initialParams, InputParams} from "../form";
import ChartContainer from "../chart";
import {Divider} from "@material-ui/core";

const TogglReportContainer = () => {
  const [requestParams, setRequestParams] = useState<InputParams>(
    initialParams
  );
  return (
    <>
      <h2>Toggl Report</h2>
      <FormContainer setRequestParams={setRequestParams}/>
      <Divider/>
      <ChartContainer requestParams={requestParams}/>
    </>
  );
};

export default TogglReportContainer;
