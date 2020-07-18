import * as React from 'react';
import useNotificationCard from './useNotificationCard';
import {
  Container,
  Title,
  IconContainer,
  Icon,
  TextContainer,
  BodyText,
  Button,
} from './styles';

const NotificationCard = () => {
  const {
    body,
    icon,
    isVisible,
    title,
    animationPosition,
    handlePressNotification,
  } = useNotificationCard();

  if (isVisible) {
    return (
      <Container style={{ transform: [{ scale: animationPosition }] }}>
        <Button onPress={handlePressNotification}>
          <TextContainer>
            {icon && (
              <IconContainer>
                <Icon name={icon} />
              </IconContainer>
            )}
            {title && <Title>{title}</Title>}
            {icon && (
              <IconContainer>
                <Icon name={icon} />
              </IconContainer>
            )}
          </TextContainer>
          {body && <BodyText>{body}</BodyText>}
        </Button>
      </Container>
    );
  }

  return null;
};

export default NotificationCard;
