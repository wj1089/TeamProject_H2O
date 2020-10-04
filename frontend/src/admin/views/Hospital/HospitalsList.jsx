import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { HospitalsToolbar } from './components';
import ModalTestView from './Test/ModalTestView';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const HospitalList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HospitalsToolbar/>
      <div className={classes.content}>
        <ModalTestView/>
      </div>
    </div>
  );
};

export default HospitalList;
