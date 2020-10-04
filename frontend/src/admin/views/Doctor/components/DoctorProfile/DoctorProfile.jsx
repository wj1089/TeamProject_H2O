import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const DoctorProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const doctor = {
    doctorNo : '1',
    doctorName: '이국종',
    age : '51',
    position: '센터장',
    detailData : ['외과', '외상외과', '응급구조학과'],
    specialized : '대통령 표창장 수상',
    medicalSubject: ['외과', '외상외과'],
    hospitalNo : '1',
    avatarUrl: '/admin_images/avatars/Doctor_01.jpg',
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
             {doctor.doctorName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              나이 : {doctor.age}세
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              직책 :{doctor.position}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              진료과목 : <br/>
              {doctor.detailData}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              상세내역 : <br/> 
              {doctor.specialized}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              진료과목 : <br/>
              {doctor.medicalSubject}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={doctor.avatarUrl}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          사진 등록
        </Button>
        <Button variant="text">사진 삭제</Button>
      </CardActions>
    </Card>
  );
};

DoctorProfile.propTypes = {
  className: PropTypes.string
};

export default DoctorProfile;
