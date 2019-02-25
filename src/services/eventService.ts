import { IEvent } from '../types';
import UUID from 'uuid/v4';
// import axios from 'axios';

let events: IEvent[] = [
  {
    id: UUID(),
    data: {
      title: 'Kurs med Abakus',
      description: 'Veldig gøy for alle involverte',
      date: new Date('February 25, 2018').toISOString(),
      url:
        'https://thumbor.abakus.no/g4mD9f-JEZPPgVPqzWdrLe_xH_o=/0x500/7df72c5a291dc020b1d5_57BlAer.png'
    }
  },
  {
    id: UUID(),
    data: {
      title: 'Mingling med Capra',
      description: 'Lorum ipsum og andre ripsbusker',
      date: new Date('February 25, 2018').toISOString(),
      url:
        'https://pbs.twimg.com/profile_images/783246497450188800/jDO2Q7n5_400x400.jpg'
    }
  }
];

export const getEvents = async () => {
  // return axios.get(`https://URL/events`)
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //     return res.data;
  //   });
  return new Promise<IEvent[]>(resolve => resolve(events.slice()));
};

export const editEvent = async (event: IEvent) => {
  // return axios.put(`https://URL/events/${event.id}`, event)
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //     return res.data;
  //   });
  return new Promise<IEvent[]>((resolve, reject) => {
    events.map(e => {
      if (e.id === event.id) {
        return event;
      }
      return e;
    });
    resolve();
  });
};

export const addEvent = async (event: IEvent) => {
  // return axios.post(`https://URL/events`, event)
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //     return res.data;
  //   });
  return new Promise<IEvent>((resolve, reject) => {
    const newEvent: IEvent = {
      ...event,
      id: UUID()
    };
    events.push(newEvent);
    resolve(newEvent);
  });
};

export const deleteEvent = async (event: IEvent) => {
  // return axios.delete(`https://URL/events/${event.id}`)
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //   });
  return new Promise((resolve, reject) => {
    events = events.filter(e => e.id !== event.id);
    resolve();
  });
};
