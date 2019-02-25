export interface IEvent {
  id: string;
  data: IEventData;
}

export interface IEventData {
  title: string;
  url: string;
  date: Date;
  description: string;
}
