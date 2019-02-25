import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { IEvent } from '../types';

const styles = {
  card: {
    minWidth: 275,
    padding: '7px 10px',
    margin: '0 15px 15px 0'
  },
  title: {
    fontSize: 24
  },
  date: {
    fontSize: 10
  },
  description: {
    fontSize: 16
  },
  textArea: {
    padding: '7px 10px',
    margin: '0 15px 15px 0'
  }
};

interface IProps extends WithStyles<typeof styles> {
  event: IEvent;
  onDelete: (event: IEvent) => void;
  onEdit: (event: IEvent) => void;
  classes: any;
}

function Event({ event, classes, onDelete, onEdit }: IProps) {
  const handleEdit = () => {
    onEdit(event);
  };
  const handleDelete = () => {
    onDelete(event);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <img src={event.data.url} alt="event logo" />
        <Typography className={classes.title}>{event.data.title}</Typography>
        <Typography className={classes.date}>
          {event.data.date ? event.data.date.toDateString() : 'Ingen dato satt'}
        </Typography>
        <Typography className={classes.description}>
          {event.data.description}
        </Typography>
      </CardContent>
      <CardActions className="action-container">
        <Button onClick={handleEdit} variant="outlined">
          <EditIcon className={classes.rightIcon} />
          Edit
        </Button>
        <Button color="secondary" onClick={handleDelete} variant="outlined">
          <DeleteIcon className={classes.rightIcon} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Event);
