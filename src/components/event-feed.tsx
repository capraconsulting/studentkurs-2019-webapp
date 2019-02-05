import * as React from 'react';

import { IEvent } from '../types'
import { getEvents, addEvent } from '../services/event-service'
import Event from './event'

export default class EventFeed extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            events: getEvents(),
            editing: []
        };

        this.onSave = this.onSave.bind(this)
        this.onUpdateTitle = this.onUpdateTitle.bind(this)
    }

    private addEvent() {
        const newEvent : IEvent[] = [{
            title: "",
            description: "",
            date: {
                day: 0,
                month: 0,
                year: 0
            },
            id: this.state.events.length + 1
        }]

        this.setState((state) => ({
            events: newEvent.concat(state.events),
            editing: [newEvent[0].id] 
        }))
    }

    private onSave(event : IEvent) {
        addEvent(event)
        this.setState((state) => ({
            events: getEvents(),
            editing: [],
        }))
    }

    private onUpdateTitle(title: string, event: IEvent) {
        const newEvent = {
            ...event,
            title: title
        }
        this.setState(state => ({
            events: state.events.filter(e => e.id != event.id).concat([newEvent])
        }))
    }

    private mapEventsToElements(events : IEvent[]) : JSX.Element[] {
        return events.map(event => (
            <Event 
                event={event} 
                editing={this.state.editing.indexOf(event.id) > -1}
                key={event.id}
                onSave={this.onSave}
                onUpdateTitle={this.onUpdateTitle}
                />))
    }

    public render() {
        return (
            <div className="event-feed">
                <button className="add-event" onClick={() => this.addEvent()}>Add event</button>
                {this.mapEventsToElements(this.state.events)}
            </div>
        );
    }
}



