import { IEvent } from '../types'


var events = [
        {
            title: "Fest hos Capra",
            description: "Hyggelig kveld i godt lag",
            date: {
                day: 1,
                month: 2,
                year: 2019,
            },
            id: 0,
        },
        {
            title: "Kurs med Abakus",
            description: "Veldig gøy for alle involverte",
            date: {
                day: 25,
                month: 2,
                year: 2019,
            },
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
    events = events.filter(temp => temp.id != event.id);
}