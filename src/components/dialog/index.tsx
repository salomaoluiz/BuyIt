import React from 'react';
import { ScrollView } from 'react-native';
import { Dialog as PaperDialog } from 'react-native-paper';

import Button from '@components/button';
import Paragraph from '@components/paragraph';
import { translate } from '@locales';

interface Props {
  isVisible: boolean;
  children: JSX.Element;
  title?: string;
  describe?: string;
  onDismiss: () => void;
  scrollable?: boolean;
  hasCancelButton?: boolean;
  leftButton?: {
    title: string;
    onPress: () => void;
  };
  rightButton?: {
    title: string;
    onPress: () => void;
  };
}

const Dialog = (props: Props) => {
  const {
    hasCancelButton,
    scrollable,
    isVisible,
    children,
    title,
    describe,
    onDismiss,
    leftButton,
    rightButton,
  } = props;

  const injectScroll = () => {
    if (scrollable)
      return (
        <PaperDialog.ScrollArea style={{ paddingHorizontal: 0 }}>
          <ScrollView>{children}</ScrollView>
        </PaperDialog.ScrollArea>
      );

    return children;
  };
  return (
    <PaperDialog visible={isVisible} onDismiss={onDismiss}>
      {title && <PaperDialog.Title>{title}</PaperDialog.Title>}
      {describe && (
        <PaperDialog.Content>
          <Paragraph text={describe} />
        </PaperDialog.Content>
      )}
      {injectScroll()}
      <PaperDialog.Actions>
        {hasCancelButton ? (
          <Button title={translate('general.cancel')} onPress={onDismiss} />
        ) : leftButton ? (
          <Button title={leftButton.title} onPress={leftButton.onPress} />
        ) : undefined}

        {rightButton && (
          <Button title={rightButton.title} onPress={rightButton.onPress} />
        )}
      </PaperDialog.Actions>
    </PaperDialog>
  );
};

export default Dialog;
