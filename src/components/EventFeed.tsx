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

interface IProps extends WithStyles<typeof styles> {}

function EventFeed({ classes }: IProps) {
  const [events, setEvents] = React.useState([] as IEvent[]);
  const [eventsBeingEdited, setEventsBeingEdited] = React.useState(
    [] as string[]
  );
  const [eventBeingCreated, setEventBeingCreated] = React.useState(
    null as IEvent | null
  );

  React.useEffect(() => {
    getEvents().then((eventsResponse: IEvent[]) => {
      setEvents(eventsResponse);
    });
  }, []);

  const addInitialEventData = () => {
    const newEvent: IEvent = {
      id: 'tempId',
      data: {
        title: '',
        description: '',
        date: new Date().toISOString(),
        url: ''
      }
    };

    setEventBeingCreated(newEvent);
  };

  const onSave = (event: IEvent) => {
    addEvent(event)
      .then(e => {
        setEvents([...events, e]);
        setEventBeingCreated(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onEdit = (event: IEvent) => {
    editEvent(event)
      .then(() => {
        setEvents([...events.map(e => (e.id === event.id ? event : e))]);
        setEventsBeingEdited([
          ...eventsBeingEdited.filter(id => id !== event.id)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onStartEdit = (event: IEvent) => {
    setEventsBeingEdited([...eventsBeingEdited, event.id]);
  };

  const onCancelEdit = (id?: string) => {
    if (id === 'tempId') {
      setEventBeingCreated(null);
    } else {
      setEventsBeingEdited([...eventsBeingEdited.filter(i => i !== id)]);
    }
  };

  const onDelete = (event: IEvent) => {
    deleteEvent(event)
      .then(() => {
        setEvents([...events.filter(e => e.id !== event.id)]);
        setEventsBeingEdited([
          ...eventsBeingEdited.filter(id => id !== event.id)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderEvents = (): JSX.Element[] =>
    events.map(event =>
      eventsBeingEdited.includes(event.id) ? (
        <EditEvent
          event={event}
          key={event.id}
          onSave={onEdit}
          onCancel={onCancelEdit}
        />
      ) : (
        <Event
          event={event}
          onDelete={onDelete}
          onEdit={onStartEdit}
          key={event.id}
        />
      )
    );

  return (
    <div className="event-feed">
      {eventBeingCreated ? (
        <EditEvent
          event={eventBeingCreated}
          onSave={onSave}
          onCancel={onCancelEdit}
        />
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={addInitialEventData}
        >
          <AddIcon />
          Add event
        </Button>
      )}
      {renderEvents()}
    </div>
  );
}

export default withStyles(styles)(EventFeed);
