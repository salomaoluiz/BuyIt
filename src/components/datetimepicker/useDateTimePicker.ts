import { Event } from '@react-native-community/datetimepicker';

import { Props } from './';

const useDateTimePicker = (props: Props) => {
  const handleChange = (event: Event, newDate?: Date) => {
    props.handleModalVisible(false);

    if (newDate) {
      props.getDateTime(newDate);
    }
  };

  return {
    handleChange,
  };
};

export default useDateTimePicker;
