import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { DoctorsToolbar}  from './components';
import DoctorTestView from './Test/DoctorTestView';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const DoctorsList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DoctorsToolbar />
      <div className={classes.content}>
        <DoctorTestView/>
      </div>
    </div>
  );
};

export default DoctorsList;
