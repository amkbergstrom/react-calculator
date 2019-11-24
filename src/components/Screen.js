import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '95%',
    },
  }));

export default function Screen(props) {
    const classes = useStyles();

        return <div className={props.elementClass}>
            <TextField id="outlined-basic"
          className={classes.textField}
          label=""
          margin="normal"
          variant="outlined" value={props.text} />
        </div>
}
