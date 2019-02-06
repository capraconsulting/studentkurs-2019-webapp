import { IEvent } from '../types'


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
    ]

export function getEvents() : IEvent[] {
    return events
}

export function addEvent(event : IEvent) {
    events.push(event)
}

export function deleteEvent(event : IEvent) {
    events = events.filter(temp => temp.id !== event.id);
}