import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { IEvent } from '../types'

const styles = {
    card: {
        minWidth: 275,
        background: 'lightblue',
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
    }
};

interface IProps {
    event: IEvent;
    classes: any;
}

function Event({ event, classes } : IProps) {
    return ( 
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title}>{event.title}</Typography>
                <Typography className={classes.date}>{event.date.toDateString()}</Typography>
                <Typography className={classes.description}>{event.description}</Typography>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(Event);