import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar } from './components';
import UserTestView from './Test/UserTestView';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UsersList = () => {
  const classes = useStyles();



  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UserTestView/>
      </div>
    </div>
  );
};

export default UsersList;
