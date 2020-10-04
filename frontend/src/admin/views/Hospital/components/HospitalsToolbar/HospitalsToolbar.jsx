import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  headline: {
    marginLeft: theme.spacing(1)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const HospitalsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}
              style={{fontWeight:"bold", fontSize:"x-large"}}>병원 관리
        <span className={classes.spacer} />
        <Link to="/admin/HospitalsAdd">
        <Button
          color="primary"
          variant="contained"
          >
          병원 등록
          </Button>
        </Link>
      </div>
    </div>
  );
};

HospitalsToolbar.propTypes = {
  className: PropTypes.string
};

export default HospitalsToolbar;
