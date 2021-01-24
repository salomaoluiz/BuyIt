import { Event } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';

import { Props } from './';

const useDateTimePicker = (props: Props) => {
  const [minimumDate, setMinimumDate] = useState<Date | undefined>();
  const [value, setValue] = useState<Date>(new Date(Date.now()));

  useEffect(() => {
    if (props.minimumDate) setMinimumDate(new Date(props.minimumDate));
    if (props.value) setValue(new Date(props.value));
  }, []);

  const handleChange = (event: Event, newDate?: Date) => {
    props.handleModalVisible(false);

    if (newDate) {
      props.getDateTime(newDate.getTime());
    }
  };

  return {
    handleChange,
    minimumDate,
    value,
  };
};

export default useDateTimePicker;
