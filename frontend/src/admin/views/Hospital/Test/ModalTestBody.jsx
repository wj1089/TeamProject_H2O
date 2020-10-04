import React, {useState, useEffect} from 'react';
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
  Checkbox, 
  FormControlLabel, 
  FormGroup, 
  Box
} from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}));

const ModalTestBody = (props) => {
    const classes = useStyles();
    const {hospitalData, setClose, className} = props
    const [businessLicenseNumber, setBusinessLicenseNumber] = useState(hospitalData.businessLicenseNumber)
    const [businessStatus, setBusinessStatus] = useState(hospitalData.businessStatus);
    const [tel, setTel] = useState(hospitalData.tel)
    const [addr, setAddr] = useState(hospitalData.addr)
    const [hospitalType, setHospitalType] = useState(hospitalData.hospitalType)
    const [medicalPeople,setMedicalPeople] = useState(hospitalData.medicalPeople)
    const [hospitalRoom,setHospitalRoom] = useState(hospitalData.hospitalRoom)
    const [hospitalBed,setHospitalBed] = useState(hospitalData.hospitalBed)
    const [hospitalArea,setHospitalArea] = useState(hospitalData.hospitalArea)
    const [latitude, setLatitude] = useState(hospitalData.latitude)
    const [longitude, setLongitude] = useState(hospitalData.longitude)
    
    const [checked, setChecked] = useState({
      checkBox1 : false,
      checkBox2 : false,
      checkBox3 : false,
    })

    const history = useHistory();

    useEffect(()=>{
      switch(hospitalData.businessStatus){
        case `영업중`: return setChecked({...checked, checkBox1:true})
        case `폐업`: return setChecked({...checked, checkBox2:true})
        case `휴업`: return setChecked({...checked, checkBox3:true})
        default : return null
      }
    }, [])


    const handleClose = () => {
      setClose(false);
    }
    
    const handleCheckBox = event => {
      setChecked({checked, [event.target.name]: event.target.checked })
      if(event.target.checked===true){
        switch(event.target.name){
          case "checkBox1": return setBusinessStatus("영업중")
          case "checkBox2": return setBusinessStatus("폐업")
          case "checkBox3": return setBusinessStatus("휴업")
          default : return setBusinessStatus(); 
        }
        
      }
    }
   
    const handelModify = e => {
      const hospitalJson = {
        hospitalNo : hospitalData.hospitalNo,
        hospitalName: hospitalData.hospitalName,
        businessLicenseNumber: businessLicenseNumber,
        businessStatus: businessStatus,
        tel : tel,
        addr : addr,
        hospitalType : hospitalType,
        medicalPeople : medicalPeople,
        hospitalRoom : hospitalRoom,
        hospitalBed : hospitalBed,
        hospitalArea : hospitalArea,
        typeDetail : hospitalData.typeDetail,
        latitude : latitude,
        longitude : longitude,
      }
      Axios
        .patch(`https://server.woojundev.site/H2O/hospital/modify/${businessLicenseNumber}`, hospitalJson)
        .then(response => {
          alert("병원 데이터 변경 성공")
          setClose(false);
          
          history.push("/admin")
          history.push("/admin/hospital")

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
            title={<h3>{hospitalData.hospitalName}</h3>}
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
                  defaultValue={hospitalData.businessLicenseNumber}
                  disabled 
                  label="사업자 등록 번호"
                  margin="dense"
                  name="businessLicenseNumber"
                  onChange={e => setBusinessLicenseNumber(e.target.value)}
                  required
                  value={businessLicenseNumber}
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
                  defaultValue={hospitalData.addr}
                  label="병원 주소"
                  margin="dense"
                  name="addr"
                  onChange={e => setAddr(e.target.value)}
                  required
                  value={addr}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                  <FormGroup row>
                    <Box 
                      marginRight="Auto"
                      width="100px"
                      name="businessStatus"
                      className={classes.boxCss}
                      margin-right="10px">{"영업상태"}</Box>
                    <FormControlLabel
                      control={ 
                        <Checkbox
                          checked={checked.checkBox1}
                          onChange={handleCheckBox}
                          name="checkBox1"
                          />}
                          label="영업"
                      />
                    <FormControlLabel
                    control={ 
                      <Checkbox
                        defaultChecked
                        checked={checked.checkBox2}
                        onChange={handleCheckBox}
                        name="checkBox2"
                        />}
                        label="폐업"
                      />
                      <FormControlLabel
                      control={ 
                        <Checkbox
                          defaultChecked
                          checked={checked.checkBox3}
                          onChange={handleCheckBox}
                          name="checkBox3"
                          />}
                          label="휴업"
                        />
                    </FormGroup>
                </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.hospitalType}
                  label="병원 형태"
                  margin="dense"
                  name="hospitalType"
                  onChange={e => setHospitalType(e.target.value)}
                  required
                  value={hospitalType}
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
                  defaultValue={hospitalData.medicalPeople}
                  label="의료인수"
                  margin="dense"
                  name="medicalPeople"
                  onChange={e => setMedicalPeople(e.target.value)}
                  required
                  value={medicalPeople}
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
                  defaultValue={hospitalData.tel}
                  label="연락처"
                  margin="dense"
                  name="tel"
                  onChange={e => setTel(e.target.value)}
                  required
                  value={tel}
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
                  defaultValue={hospitalData.hospitalRoom}
                  label="병실수"
                  margin="dense"
                  name="hospitalRoom"
                  onChange={e => setHospitalRoom(e.target.value)}
                  required
                  value={hospitalRoom}
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
                  defaultValue={hospitalData.hospitalBed}
                  label="병상수"
                  margin="dense"
                  name="hospitalBed"
                  onChange={e => setHospitalBed(e.target.value)}
                  required
                  value={hospitalBed}
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
                  defaultValue={hospitalData.hospitalArea}
                  label="병원크기"
                  margin="dense"
                  name="hospitalArea"
                  onChange={e => setHospitalArea(e.target.value)}
                  required
                  value={hospitalArea}
                  variant="outlined"
                />
              </Grid>
              
              <Grid
                item
                md={12}
                xs={12}
              >
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.latitude}
                  label="위도"
                  margin="dense"
                  name="latitude"
                  onChange={e => setLatitude(e.target.value)}
                  required
                  value={latitude}
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
                  defaultValue={hospitalData.longitude}
                  label="경도"
                  margin="dense"
                  name="longitude"
                  onChange={e => setLongitude(e.target.value)}
                  required
                  value={longitude}
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
  
  ModalTestBody.propTypes = {
    className: PropTypes.string
  };
  
  export default ModalTestBody;