import * as React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles, WithStyles} from '@material-ui/core/styles';

import {IEvent} from '../types'
import {getEvents, addEvent, deleteEvent} from '../services/eventService'
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
  eventsBeingEdited: number[],
}

interface IProps extends WithStyles<typeof styles> {
}

class EventFeed extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      eventsBeingEdited: [],
    };

    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  public componentDidMount() {
    getEvents().then((events: IEvent[]) => {
      this.setState({
        events,
      });
    })
  }

  private addEvent() {
    const newEvent: IEvent = {
      title: "",
      description: "",
      date: new Date(),
      id: this.state.events.length + 1,
    };

    this.setState((state) => ({
      events: [...state.events, newEvent],
      eventsBeingEdited: [...state.eventsBeingEdited, newEvent.id],
    }));
  }

  private onSave(event: IEvent) {
    addEvent(event).then(() => {
      this.setState((state) => ({
        events: state.events.map(e => e.id === event.id ? event : e),
        eventsBeingEdited: state.eventsBeingEdited.filter(id => id !== event.id),
      }));
    }).catch((err) => {
      console.log(err);
    });
  }

  private onDelete(event: IEvent) {
    deleteEvent(event).then(() => {
      this.setState((state) => ({
        events: state.events.filter(e => e.id !== event.id),
        eventsBeingEdited: state.eventsBeingEdited.filter(id => id !== event.id),
      }));
    }).catch((err) => {
      console.log(err);
    });
  }

  private mapEventsToElements(events: IEvent[]): JSX.Element[] {
    return events.map(event => (
      this.state.eventsBeingEdited.includes(event.id) ?
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
        />
    ));
  }


  public render() {
    return (
      <div className="event-feed">
        <Button
          variant="contained"
          color="primary"
          className={this.props.classes.button}
          onClick={this.addEvent}>
          Add event
        </Button>
        {this.mapEventsToElements(this.state.events)}
      </div>
    );
  }
}

export default withStyles(styles)(EventFeed)
