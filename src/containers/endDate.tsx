import React, {ComponentProps} from 'react';
import * as moment from 'moment';
import DateInput from '../components/dateInput';

type DateInputProps = ComponentProps<typeof DateInput>;
type RequiredOnChange = Required<Pick<DateInputProps, 'onChange'>>;
type Props = Partial<DateInputProps> & RequiredOnChange;

const EndDateInputContainer = (props: Props) => {
  const defaultValue = moment
    .default()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  return <DateInput defaultValue={defaultValue} label={'End Date'} {...props} />;
};

export default EndDateInputContainer;
