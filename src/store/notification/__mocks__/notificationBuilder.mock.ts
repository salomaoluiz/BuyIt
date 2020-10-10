class NotificationBuilder {
  id = 12345;
  message = 'message';
  date = new Date(Date.now());
  title = '';
  body = '';
  soundName = '';
  repeatInterval = 0;
  number = 0;

  withId(id: number) {
    this.id = id;
    return this;
  }

  withMessage(message: string) {
    this.message = message;
    return this;
  }

  withDate(date: Date) {
    this.date = date;
    return this;
  }

  withbody(body: string) {
    this.body = body;
    return this;
  }

  withSoundName(soundName: string) {
    this.soundName = soundName;
    return this;
  }

  withRepeatInterval(repeatInterval: number) {
    this.repeatInterval = repeatInterval;
    return this;
  }

  withNumber(number: number) {
    this.number = number;
    return this;
  }

  build = () => {
    return {
      id: this.id,
      message: this.message,
      date: this.date,
      title: this.title,
      body: this.body,
      soundName: this.soundName,
      repeatInterval: this.repeatInterval,
      number: this.number,
    };
  };
}

export default NotificationBuilder;
