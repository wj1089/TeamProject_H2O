import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BoardToolbar from './components/BoardsToolbar';
import BoardTestView from './components/BoardTestView';




const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Board = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BoardToolbar/>
      <div className={classes.content}>
        <BoardTestView/>
      </div>
    </div>
  );
};

export default Board;
