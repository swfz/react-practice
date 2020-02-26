import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

const DateInput = (props: {
  defaultValue?: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
    <TextField
        onChange={props.onChange}
        label={props.label}
        defaultValue={props.defaultValue}
        type="date"
    />
);

export default DateInput;
