import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {IEvent} from '../types'

const styles = {
  card: {
    minWidth: 275,
    padding: "7px 10px",
    margin: "0 15px 15px 0",
  },
  title: {
    fontSize: 24,
  },
  date: {
    fontSize: 10,
  },
  description: {
    fontSize: 16
  },
  textArea: {
    padding: "7px 10px",
    margin: "0 15px 15px 0",
  },
};

interface IProps {
  event: IEvent;
  onSave: (event: IEvent) => void;
  classes: any;
}

interface IState {
  description: string,
  title: string,
  date: string
}

class Event extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: this.props.event.description,
      title: this.props.event.title,
      date: this.props.event.date.toDateString()
    };
  }

  private handleChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<IState, keyof IState>);
  };

  private onClick = () => this.props.onSave({
    description: this.state.description,
    title: this.state.title,
    date: new Date(this.state.date),
    id: this.props.event.id,
  });

  public render() {
    return (
      <Card className={this.props.classes.card}>
        <CardContent>
          <TextField
            className={this.props.classes.textArea}
            label="Title"
            value={this.state.title}
            onChange={this.handleChange('title')}
            variant="filled"/>
          <TextField
            className={this.props.classes.textArea}
            label="Date"
            value={this.state.date}
            onChange={this.handleChange('date')}
            type="date"
            variant="filled"/>
          <TextField
            className={this.props.classes.textArea}
            id="standard-multiline-static"
            label="Description"
            multiline={true}
            rows="2"
            rowsMax="8"
            value={this.state.description}
            onChange={this.handleChange('description')}
            variant="filled"/>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={this.onClick}>
            Add
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Event);
