import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}));

const DoctorTestBody = (props) => {
    const classes = useStyles();
    const {doctorData, setClose, className} = props
    const [doctorsLicense, setDoctorsLicense] = useState(doctorData.doctorsLicense)
    const [hospitalName, setHospitalName] = useState(doctorData.hospitalName);
    const [position, setPosition] = useState(doctorData.position)
    const [detailData, setDetailData] = useState(doctorData.detailData)
    const [specialized, setSpecialized] = useState(doctorData.specialized)
    const [medicalSubject, setMedicalSubject] = useState(doctorData.medicalSubject)
    const [birthday, setBirthday] = useState(doctorData.birthday)

    const history = useHistory();


    const handleClose = () => {
      setClose(false);
    }
   
    const handelModify = e => {
      const doctorJson = {
        doctorNo : doctorData.doctorNo,
        doctorName: doctorData.doctorName,
        doctorsLicense: doctorsLicense,
        hospitalName: hospitalName,
        position : position,
        detailData : detailData,
        specialized : specialized,
        medicalSubject : medicalSubject,
        birthday : birthday
      }
      Axios
        .patch(`https://server.woojundev.site/H2O/doctor/modify/${doctorsLicense}`, doctorJson)
        .then(response => {
          alert("병원 데이터 변경 성공")
          setClose(false);
          history.push("/admin/doctor")

        })
        .catch(
          error => {
            alert("병원 데이터 변경 실패")
            throw(error)
          }  
        )
    }
    return (
      
      <Card
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader
            title={<h3>{doctorData.doctorName}</h3>}
            space={3}
             />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={2}
            >
              
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.doctorsLicense}
                  disabled 
                  label="의사 면허 번호"
                  margin="dense"
                  name="doctorsLicense"
                  onChange={e => setDoctorsLicense(e.target.value)}
                  required
                  value={doctorsLicense}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.hospitalName}
                  label="소속 병원"
                  margin="dense"
                  name="hospitalName"
                  onChange={e => setHospitalName(e.target.value)}
                  required
                  value={hospitalName}
                  variant="outlined"
                />
              </Grid>
              
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.position}
                  label="직책"
                  margin="dense"
                  name="position"
                  onChange={e => setPosition(e.target.value)}
                  required
                  value={position}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.detailData}
                  label="상세정보"
                  margin="dense"
                  name="detailData"
                  onChange={e => setDetailData(e.target.value)}
                  required
                  value={detailData}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.specialized}
                  label="전문분야"
                  margin="dense"
                  name="specialized"
                  onChange={e => setSpecialized(e.target.value)}
                  required
                  value={specialized}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.medicalSubject}
                  label="진료과목"
                  margin="dense"
                  name="medicalSubject"
                  onChange={e => setMedicalSubject(e.target.value)}
                  required
                  value={medicalSubject}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={doctorData.birthday}
                  label="생년월일"
                  margin="dense"
                  name="birthday"
                  onChange={e => setBirthday(e.target.value)}
                  required
                  value={birthday}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
          <Button onClick={e => {handelModify()}}
              color="primary"
              variant="contained"
            >
              변경된 정보 저장
            </Button>
            <Button onClick={e => {handleClose()}}
              variant="contained" 
              color="secondary"
            >
              취소
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  };
  
  DoctorTestBody.propTypes = {
    className: PropTypes.string
  };
  
  export default DoctorTestBody;