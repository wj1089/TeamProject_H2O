import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { Checkbox, FormControlLabel, FormGroup, Box } from '@material-ui/core';
import Postcode from '../../../../helpers/Postcode';
import {Modal} from 'react-bootstrap'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  boxCss: {
    marginTop: theme.spacing(3),
  }
}));
const UserAdd = () => {
  const classes = useStyles();
  const [hospitalName, setHospitalName] = useState("");
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState("");
  const [businessStatus, setBusinessStatus] = useState("");
  const [tel, setTel] = useState("")
  const [addr, setAddr] = useState("");
  const [hospitalType, setHospitalType] = useState("")
  const [medicalPeople,setMedicalPeople] = useState("")
  const [hospitalRoom,setHospitalRoom] = useState("")
  const [hospitalBed,setHospitalBed] = useState("")
  const [hospitalArea,setHospitalArea] = useState("")
  const [typeDetail,setTypeDetail] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [hospitalIdChecker, setHospitalIdChecker] = useState("")
  const [checked, setChecked] = useState({
    checkBox1 : false,
    checkBox2 : false,
    checkBox3 : false,
  })
  const [show, setShow] = useState(false)
  
  const history = useHistory();
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
  
  const handleIdCheck = e =>   {
    setHospitalIdChecker("")
    if(businessLicenseNumber){
    e.preventDefault();
    axios
      .get(`https://server.woojundev.site/H2O/hospital/BusinessLicenseCheck/${businessLicenseNumber}`)
      .then(response => {
        alert("이미 등록된 병원입니다.");
        setHospitalIdChecker("unavailable")
      })
      .catch(error => {
        alert("등록 가능합니다.");
        setHospitalIdChecker("available")
      })
    }else{
      alert("등록 여부를 확인하세요.")
    }
  }
  const handleSubmit = e => {
    if(hospitalName){
    e.preventDefault();
    setHospitalIdChecker("")
    const userJson = {
      hospitalName: hospitalName,
      businessLicenseNumber: businessLicenseNumber,
      businessStatus : businessStatus,
      tel: tel,
      addr: addr,
      hospitalType: hospitalType,
      medicalPeople: medicalPeople,
      hospitalRoom: hospitalRoom,
      hospitalBed: hospitalBed,
      hospitalArea: hospitalArea,
      typeDetail: typeDetail,
      latitude: latitude,
      longitude: longitude
    }
    if(hospitalIdChecker==="available"){
      axios.post(`https://server.woojundev.site/H2O/hospital/hospitalAdd`, userJson)
        .then(response => {
          alert("병원 등록 성공 !")
          history.push("/admin/hospital")
            }
        ).catch(
          
        error => { 
          alert("병원 등록 실패")
          
          throw (error) 
        }
    );
    }else if(hospitalIdChecker==="unavailable"){
      alert("이미 등록된 병원입니다.")
    }else{
      alert("등록여부를 확인해주세요.")
    }
  }else{
    alert("입력되지 않은 정보가 있습니다.")
  }
  }
  const handleCancel = () => {
    history.push('/admin/hospital')
  }
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
          병원 등록
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="businessLicenseNumber"
                      label="병원 사업자 등록번호"
                      name="businessLicenseNumber"
                      autoComplete="businessLicenseNumber"
                      value={businessLicenseNumber || ''}
                      onChange={e => setBusinessLicenseNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}
                      container
                      direction="column"
                      justify="flex-end"
                      alignItems="flex-end"
                >
                  <Button variant="outlined" color="secondary" onClick={handleIdCheck}>
                    사업자 번호 <br/>확인
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="hospitalName"
                      label="병원 이름"
                      name="hospitalName"
                      autoComplete="hospitalName"
                      value={hospitalName || ''}
                      onChange={e => setHospitalName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} > 
                  <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="tel"
                  label="연락처"
                  name="tel"
                  autoComplete="tel"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    name="addr"
                    required
                    fullWidth
                    id="addr"
                    label="병원 주소"
                    autoFocusㅉ
                    autoComplete="addr"
                    value={addr}
                    onChange={e => setAddr(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end">
                  <Button style={{height:55, width:110}} variant="outlined" color="secondary" onClick={handleShow}>
                    주소검색
                  </Button>
                </Grid>
                <Grid>
                  <FormGroup row>
                    <Box 
                      variant="outlined"
                      marginRight="Auto"
                      width="100px"
                      name="businessStatus"
                      className={classes.boxCss}
                      margin-right="20px">{"영업상태"}</Box>
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
                        checked={checked.checkBox2}
                        onChange={handleCheckBox}
                        name="checkBox2"
                        />}
                        label="폐업"
                      />
                      <FormControlLabel
                      control={ 
                        <Checkbox
                          checked={checked.checkBox3}
                          onChange={handleCheckBox}
                          name="checkBox3"
                          />}
                          label="휴업"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="hospitalType"
                    label="병원 형태"
                    name="hospitalType"
                    autoComplete="hospitalType"
                    value={hospitalType}
                    onChange={e => setHospitalType(e.target.value)}
                  />
                  </Grid>
                <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="medicalPeople"
                label="병원 근무자 수"
                name="medicalPeople"
                autoComplete="medicalPeople"
                value={medicalPeople}
                onChange={e => setMedicalPeople(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="hospitalRoom"
                label="병실수"
                name="hospitalRoom"
                autoComplete="hospitalRoom"
                value={hospitalRoom}
                onChange={e => setHospitalRoom(e.target.value)}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="hospitalBed"
                label="병상수"
                name="hospitalBed"
                autoComplete="hospitalBed"
                value={hospitalBed}
                onChange={e => setHospitalBed(e.target.value)}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="hospitalArea"
                label="병원 크기"
                name="hospitalArea"
                autoComplete="hospitalArea"
                value={hospitalArea}
                onChange={e => setHospitalArea(e.target.value)}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="typeDetail"
                label="병원 상세정보"
                name="typeDetail"
                autoComplete="typeDetail"
                value={typeDetail}
                onChange={e => setTypeDetail(e.target.value)}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="latitude"
                label="위도"
                name="latitude"
                autoComplete="latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                id="longitude"
                label="경도"
                name="longitude"
                autoComplete="longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                />
              </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            등록하기
          </Button>
          <Button
            fullWidth
            className={classes.cancel}
            onClick={handleCancel}
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: "#FF4537"
            }}
          >
            취소하기
          </Button>
         </Grid>
         {/* ---------------------- Modal ----------------------------------- */}
                <Modal 
                  show={show} 
                  onHide={handleClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  scrollable={Boolean(true)}
                  >
                <Modal.Header closeButton>
                  <Modal.Title>등록 병원 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Postcode
                    setAddr={(addr)=>{setAddr(addr)}}
                    setClose={(close)=>{setShow(close)}}
                    />
                  {/* <BoardTestBody 
                    hospitalData={hospitalData} 
                    setClose={(close)=>{setShow(close)}}
                    /> */}
                  </Modal.Body>
              </Modal>
        </form>
      </div>
    </Container>
    
  );
}
export default UserAdd