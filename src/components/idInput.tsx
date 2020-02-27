import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

const IdInput = (props: {
  index: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <TextField
      onChange={props.onChange}
      label="WorkSpaceId"
      variant="outlined"
    />
  </div>
);

export default IdInput;
