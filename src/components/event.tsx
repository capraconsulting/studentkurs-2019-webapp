import * as React from 'react';

import { IEvent, IDate } from '../types'

interface Props {
    event: IEvent;
}

function dateFormater(date: IDate) : string {
    return date.day + '.' + date.month + '.' + date.year
}

export default function Event({ event } : Props) {
    return (
        <div className="event">
            <h2>{event.title}</h2>
            <h4>{dateFormater(event.date)}</h4>
            <p>{event.description}</p>
        </div>
    );
}