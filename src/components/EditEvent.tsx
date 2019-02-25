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

interface IState {
  description: string;
  title: string;
  url: string;
  date: string;
}

function getDate(event: IEvent): string {
  const date = event.data.date ? new Date(event.data.date) : new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

class Event extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: props.event.data.description,
      title: props.event.data.title,
      url: props.event.data.url,
      date: getDate(props.event)
    };
  }

  private handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    } as Pick<IState, keyof IState>);
  };

  private onCancel = () => this.props.onCancel(this.props.event.id);

  private onClick = () =>
    this.props.onSave({
      data: {
        ...this.state,
        date: new Date(this.state.date).toISOString()
      },
      id: this.props.event.id
    });

  public render() {
    return (
      <Card className={this.props.classes.card}>
        <CardContent>
          <TextField
            className={this.props.classes.textArea}
            label="Title"
            value={this.state.title}
            name="title"
            onChange={this.handleChange()}
            variant="filled"
          />
          <TextField
            className={this.props.classes.textArea}
            label="Image URL"
            value={this.state.url}
            name="url"
            onChange={this.handleChange()}
            variant="filled"
          />
          <TextField
            className={this.props.classes.textArea}
            label="Date"
            value={this.state.date}
            name="date"
            onChange={this.handleChange()}
            type="date"
            variant="filled"
          />
          <TextField
            className={this.props.classes.textArea}
            id="standard-multiline-static"
            label="Description"
            multiline={true}
            rows="2"
            rowsMax="8"
            value={this.state.description}
            name="description"
            onChange={this.handleChange()}
            variant="filled"
          />
        </CardContent>
        <CardActions className="action-container">
          <Button variant="outlined" color="primary" onClick={this.onClick}>
            <SaveIcon className={this.props.classes.rightIcon} />
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={this.onCancel}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Event);
