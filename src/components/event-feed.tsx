import * as React from 'react';

import { IEvent } from '../types'
import { getEvents } from '../services/event-service'
import Event from './event'

export default function EventFeed() {
    const events = getEvents()

    return (
        <div className="event-feed">
            {events.map(event => (
                <Event event={event}></Event>))}
        </div>
    );
}



