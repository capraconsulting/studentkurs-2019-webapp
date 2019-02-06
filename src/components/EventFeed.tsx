import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { IEvent } from '../types'
import { getEvents, addEvent } from '../services/event-service'
import Event from './Event'
import EditEvent from './EditEvent'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class EventFeed extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            events: getEvents(),
            editing: []
        };

        this.onSave = this.onSave.bind(this)
    }

    private addEvent() {
        const newEvent : IEvent[] = [{
            title: "",
            description: "",
            date: new Date(),
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

    private mapEventsToElements(events : IEvent[]) : JSX.Element[] {
        return events.map(event => (
            this.state.editing.indexOf(event.id) > -1 ?
            <EditEvent 
                event={event} 
                key={event.id}
                onSave={this.onSave}
                />
            :
            <Event 
                event={event} 
                key={event.id}
                />));
    }

    private onClick = () => this.addEvent()

    public render() {
        return (
            <div className="event-feed">
                <Button 
                    variant="outlined" 
                    className={this.props.classes.button} 
                    onClick={this.onClick}> 
                    Add event
                </Button>
                {this.mapEventsToElements(this.state.events)}
            </div>
        );
    }
}

export default withStyles(styles)(EventFeed)
