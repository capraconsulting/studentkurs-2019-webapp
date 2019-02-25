import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

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

interface IProps {
  event: IEvent;
  onSave: (event: IEvent) => void;
  onCancel: (id: string) => void;
  classes: any;
}

function withPadding(value: number): string {
  return value < 10 ? `0${value}` : '' + value;
}

function getDate(event: IEvent): string {
  const date = event.data.date ? new Date(event.data.date) : new Date();
  return `${date.getFullYear()}-${withPadding(
    date.getMonth() + 1
  )}-${withPadding(date.getDate())}`;
}

function Event({ classes, event, onCancel, onSave }: IProps) {
  const [description, setDescription] = React.useState(event.data.description);
  const [title, setTitle] = React.useState(event.data.title);
  const [url, setUrl] = React.useState(event.data.url);
  const [date, setDate] = React.useState(getDate(event));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const updateFn = {
      description: setDescription,
      title: setTitle,
      url: setUrl,
      date: setDate
    }[name];

    updateFn(value);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>): void => {
    onCancel(event.id);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    onSave({
      data: {
        title,
        description,
        url,
        date: new Date(date).toISOString()
      },
      id: event.id
    });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          className={classes.textArea}
          label="Title"
          value={title}
          name="title"
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          className={classes.textArea}
          label="Image URL"
          value={url}
          name="url"
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          className={classes.textArea}
          label="Date"
          value={date}
          name="date"
          onChange={handleChange}
          type="date"
          variant="filled"
        />
        <TextField
          className={classes.textArea}
          id="standard-multiline-static"
          label="Description"
          multiline={true}
          rows="2"
          rowsMax="8"
          value={description}
          name="description"
          onChange={handleChange}
          variant="filled"
        />
      </CardContent>

      <CardActions className="action-container">
        <Button variant="outlined" color="primary" onClick={onClick}>
          <SaveIcon className={classes.rightIcon} />
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Event);
