import {IEvent} from '../types'

let events = [
  {
    title: "Fest hos Capra",
    description: "Lorum ipsum og andre ripsbusker",
    date: new Date("February 25, 2018"),
    id: 0,
    url: "https://pbs.twimg.com/profile_images/783246497450188800/jDO2Q7n5_400x400.jpg",
  },
  {
    title: "Kurs med Abakus",
    description: "Veldig gøy for alle involverte",
    date: new Date("February 25, 2018"),
    id: 1,
    url: "https://thumbor.abakus.no/g4mD9f-JEZPPgVPqzWdrLe_xH_o=/0x500/7df72c5a291dc020b1d5_57BlAer.png",
  }
];

export const getEvents = async () => {
  return new Promise<IEvent[]>((resolve) => resolve(events));
};

export const editEvent = async (event: IEvent) => {
  return new Promise<IEvent[]>((resolve, reject) => {
    events.map(e => {
      if (e.id === event.id) {
        return event;
      }
      return e;
    });
    resolve();
    // reject("noe gikk galt");
  });
};

export const addEvent = async (event: IEvent) => {
  return new Promise<IEvent[]>((resolve, reject) => {
    events.push(event);
    resolve();
    // reject("noe gikk galt");
  });
};

export const deleteEvent = async (event: IEvent) => {
  return new Promise<IEvent[]>((resolve, reject) => {
    events = events.filter(e => e.id !== event.id);
    resolve();
    // reject("noe gikk galt");
  });
};
