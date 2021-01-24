import NativeDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

import useDateTimePicker from './useDateTimePicker';

type DateMode = 'date' | 'time' | 'datetime' | 'countdown' | undefined;

export interface Props {
  isVisible: boolean;
  mode: DateMode;
  value?: number;
  minimumDate?: number;
  getDateTime: (dateTime: number) => void;
  handleModalVisible: (visible?: boolean) => void;
}

const DateTimePicker = (props: Props) => {
  const { isVisible, mode } = props;

  if (!isVisible) return null;

  const { handleChange, minimumDate, value } = useDateTimePicker(props);

  return (
    <NativeDateTimePicker
      minimumDate={minimumDate}
      value={value}
      mode={mode}
      onChange={handleChange}
    />
  );
};

export default DateTimePicker;
