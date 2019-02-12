import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles} from '@material-ui/core/styles';

import { IEvent } from '../types'
import { getEvents, addEvent, deleteEvent } from '../services/event-service'
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

interface IState {
    events: IEvent[],
    editing: number[]
}

interface IProps extends WithStyles<typeof styles> {}

class EventFeed extends React.Component<IProps, IState> {
    constructor(props: any){
        super(props);
        this.state = {
            events: getEvents(),
            editing: []
        };

        this.onSave = this.onSave.bind(this)
        this.onDelete = this.onDelete.bind(this)
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

    private onDelete(event : IEvent) {
        deleteEvent(event)
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
                onDelete={this.onDelete}
                key={event.id}
                />));
    }

    private onClick = () => this.addEvent()

    public render() {
        return (
            <div className="event-feed">
                <Button 
                    variant="contained" 
                    color="primary"
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
