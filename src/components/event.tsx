import * as React from 'react';

import { IEvent, IDate } from '../types'

interface Props {
    event: IEvent;
    editing: boolean;
    onUpdateTitle: (title : string, event: IEvent) => void;
    onSave: (event : IEvent) => void;
}

function dateFormater(date: IDate) : string {
    return date.day + '.' + date.month + '.' + date.year
}

export default function Event({ event, editing, onUpdateTitle, onSave } : Props) {
    return ( editing ?
        <form className="event">
            <input value={event.title} onChange={evt => onUpdateTitle(evt.target.value, event)}/>
            <input />
            <input/>
            <button onClick={() => onSave(event)}>Add</button>
        </form>
        :
        <div className="event">
            <h2>{event.title}</h2>
            <h4>{dateFormater(event.date)}</h4>
            <p>{event.description}</p>
        </div>
    );
}