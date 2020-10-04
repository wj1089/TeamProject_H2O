import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios'

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  Chart,
  HospitalsMap
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();



    const [userData, setUserData] = useState([])
    const [hospitalData, setHospitalData] = useState([])
    const [doctorData, setDoctorData] = useState([])
    const [boardData, setBoardData] = useState([])



    useEffect(()=>{

      axios
      .get(`https://server.woojundev.site/H2O/user/userList`)
      .then(response => {
        setUserData(response.data)
      })
      .catch(error => {
        alert("서버와의 연결이 되지 않았습니다.");
      })

      axios
        .get(`https://server.woojundev.site/H2O/hospital/hospitalList`)
        .then(response => {
          setHospitalData(response.data)
        })
        .catch(error => {
          alert("서버와의 연결이 되지 않았습니다.");
        })

      axios
      .get(`https://server.woojundev.site/H2O/doctor/doctorList`)
      .then(response => {
        setDoctorData(response.data)
      })
      .catch(error => {
        alert("서버와의 연결이 되지 않았습니다.");
      })

      axios
        .get(`https://server.woojundev.site/H2O/board/boardList`)
        .then(response => {
          setBoardData(response.data)
        })
        .catch(error => {
          alert("서버와의 연결이 되지 않았습니다.");
        })

      
    }, [])






  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget data={userData}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers data={doctorData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress data={hospitalData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit data={boardData}/>
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          xl={6}
          xs={12}
        >
          <Chart/>
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          xl={6}
          xs={12}
        >
          <HospitalsMap />
        </Grid>
        </Grid>
    </div>
  );
};

export default Dashboard;
