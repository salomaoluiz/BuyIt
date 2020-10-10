import DateTimePicker from '@components/datetimepicker';
import React from 'react';

export interface Props {
  setDueDate: (date: Date) => void;
  dueDate?: Date;
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
