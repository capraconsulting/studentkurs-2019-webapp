import { IEvent } from '../types'

export function getEvents() : IEvent[] {
    return [
        {
            title: "Fest hos Capra",
            description: "Hyggelig kveld i godt lag",
            date: {
                day: 1,
                month: 2,
                year: 2019,
            }
        },
        {
            title: "Kurs med Abakus",
            description: "Veldig gøy for alle involverte",
            date: {
                day: 25,
                month: 2,
                year: 2019,
            }
        }
    ]
}