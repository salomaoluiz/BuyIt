import React from 'react';
import NativeDateTimePicker from '@react-native-community/datetimepicker';
import useDateTimePicker from './useDateTimePicker';

type DateMode = 'date' | 'time' | 'datetime' | 'countdown' | undefined;

export interface Props {
  isVisible: boolean;
  mode: DateMode;
  value?: Date;
  minimumDate?: Date;
  getDateTime: (dateTime: Date) => void;
  handleModalVisible: (visible?: boolean) => void;
}

const DateTimePicker = (props: Props) => {
  const { isVisible, mode, value, minimumDate } = props;

  if (!isVisible) return null;

  const { handleChange } = useDateTimePicker(props);

  return (
    <NativeDateTimePicker
      minimumDate={minimumDate}
      value={value || new Date()}
      mode={mode}
      onChange={handleChange}
    />
  );
};

export default DateTimePicker;
