import React from 'react';

import DateTimePicker from '@components/datetimepicker';

export interface Props {
  setDueDate: (date: number) => void;
  dueDate?: number;
  handleModalVisible: (visible?: boolean) => void;
  isVisible: boolean;
}

const DueDateModal = (props: Props) => {
  const { isVisible, dueDate, handleModalVisible, setDueDate } = props;

  return (
    <DateTimePicker
      handleModalVisible={handleModalVisible}
      isVisible={isVisible}
      mode="date"
      getDateTime={setDueDate}
      value={dueDate}
    />
  );
};
export default DueDateModal;
