import {IEvent} from '../types'

let events = [
  {
    title: "Fest hos Capra",
    description: "Lorum ipsum og andre ripsbusker",
    date: new Date("February 25, 2018"),
    id: 0,
  },
  {
    title: "Kurs med Abakus",
    description: "Veldig gøy for alle involverte",
    date: new Date("February 25, 2018"),
    id: 1,
  }
];

export const getEvents = async () => {
  return new Promise<IEvent[]>((resolve) => resolve(events));
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
