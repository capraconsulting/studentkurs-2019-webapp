import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { IEvent } from '../types';
import {
  getEvents,
  addEvent,
  deleteEvent,
  editEvent
} from '../services/eventService';
import Event from './Event';
import EditEvent from './EditEvent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

interface IState {
  events: IEvent[];
  eventsBeingEdited: string[];
  eventBeingCreated?: IEvent;
}

interface IProps extends WithStyles<typeof styles> {}

class EventFeed extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      eventsBeingEdited: [],
      eventBeingCreated: undefined
    };

    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onStartEdit = this.onStartEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.addInitialEventData = this.addInitialEventData.bind(this);
  }

  public componentDidMount() {
    getEvents().then((events: IEvent[]) => {
      this.setState({
        events
      });
    });
  }

  private addInitialEventData() {
    const newEvent: IEvent = {
      id: 'tempId',
      data: {
        title: '',
        description: '',
        date: new Date().toISOString(),
        url: ''
      }
    };

    this.setState({
      eventBeingCreated: newEvent
    });
  }

  private onSave(event: IEvent) {
    addEvent(event)
      .then(e => {
        this.setState(state => ({
          events: [e, ...state.events],
          eventBeingCreated: undefined
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  private onEdit(event: IEvent) {
    editEvent(event)
      .then(() => {
        this.setState(state => ({
          events: state.events.map(e => (e.id === event.id ? event : e)),
          eventsBeingEdited: state.eventsBeingEdited.filter(
            id => id !== event.id
          )
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  private onStartEdit(event: IEvent) {
    this.setState(state => ({
      eventsBeingEdited: [...state.eventsBeingEdited, event.id]
    }));
  }

  private onCancelEdit(id?: string) {
    if (id === 'tempId') {
      this.setState({
        eventBeingCreated: undefined
      });
    } else {
      this.setState(state => ({
        eventsBeingEdited: state.eventsBeingEdited.filter(i => i !== id)
      }));
    }
  }

  private onDelete(event: IEvent) {
    deleteEvent(event)
      .then(() => {
        this.setState(state => ({
          events: state.events.filter(e => e.id !== event.id),
          eventsBeingEdited: state.eventsBeingEdited.filter(
            id => id !== event.id
          )
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  private mapEventsToElements(events: IEvent[]): JSX.Element[] {
    return events.map(event =>
      this.state.eventsBeingEdited.includes(event.id) ? (
        <EditEvent
          event={event}
          key={event.id}
          onSave={this.onEdit}
          onCancel={this.onCancelEdit}
        />
      ) : (
        <Event
          event={event}
          onDelete={this.onDelete}
          onEdit={this.onStartEdit}
          key={event.id}
        />
      )
    );
  }

  public render() {
    return (
      <div className="event-feed">
        {this.state.eventBeingCreated ? (
          <EditEvent
            event={this.state.eventBeingCreated}
            onSave={this.onSave}
            onCancel={this.onCancelEdit}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={this.props.classes.button}
            onClick={this.addInitialEventData}
          >
            <AddIcon />
            Add event
          </Button>
        )}
        {this.mapEventsToElements(this.state.events)}
      </div>
    );
  }
}

export default withStyles(styles)(EventFeed);
