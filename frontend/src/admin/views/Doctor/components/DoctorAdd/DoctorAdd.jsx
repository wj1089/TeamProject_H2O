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
    margin: theme.spacing(2, 0, 1),
  },
  cancel: {
    margin: theme.spacing(1,0,0),
  },
}));




const DoctorAdd = () => {
  const classes = useStyles();
  const [doctorsLicense, setDoctorsLicense] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [position, setPosition] = useState("");
  const [detailData, setDetailData] = useState("")
  const [specialized, setSpecialized] = useState("")
  const [medicalSubject, setMedicalSubject] = useState("")
  const [birthday, setBirthday] = useState("")
  const [licenseChecker, setLicenseChecker] = useState("")

  const history = useHistory();
  const handleIdCheck = e => {
    setLicenseChecker("")
    if(doctorsLicense){
    e.preventDefault();
    axios
      .get(`https://server.woojundev.site/H2O/doctor/licenseCheck/${doctorsLicense}`)
      .then(response => {
        alert("이미 존재하는 면허번호 입니다.");
        setLicenseChecker("unavailable");
      })
      .catch(error => {
          alert("사용한 가능한 면허번호 입니다.");
          setLicenseChecker("available");
      })
    }else{
      alert("의사 면허번호를 입력하세요.")
    }
  }

  const handleSubmit = e => {
    if(doctorName){
    e.preventDefault();
    setLicenseChecker("")
    const doctorJson = {
      doctorsLicense: doctorsLicense,
      doctorName: doctorName,
      hospitalName: hospitalName,
      position: position,
      detailData: detailData,
      specialized: specialized,
      medicalSubject: medicalSubject,
      birthday: birthday,
      hospitalNo : "1"
    }

    if(licenseChecker==="available"){
      axios.post(`https://server.woojundev.site/H2O/doctor/doctorAdd`, doctorJson)
        .then(response => {
          alert("회원가입 성공 !")
          history.push("/admin/doctor")
            }
        ).catch(
          
        error => { 
          alert("회원가입 실패")
          throw (error) 
        }
    );
      }else if(licenseChecker==="unavailable"){
        alert("라이센스가 이미 존재합니다.")
      }else{
        alert("라이센스 중복 체크를 해주세요.")
      }
    }else{
      alert("입력되지 않은 정보가 있습니다.")
    }
  }

  const handleCancel = () => {
    history.push('/admin/doctor')
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
          의사 등록
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="doctorsLicense"
                  label="의사 면허번호"
                  name="doctorsLicense"
                  autoComplete="doctorsLicense"
                  value={doctorsLicense}
                  onChange={e => setDoctorsLicense(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end"
            >
              <Button variant="outlined" color="secondary" onClick={handleIdCheck}>
                라이센스<br/>
                중복 확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="doctorName"
                name="doctorName"
                variant="outlined"
                required
                fullWidth
                id="doctorName"
                label="이름"
                autoFocus
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="hospitalName"
                label="소속 병원 이름"
                name="hospitalName"
                autoComplete="hospitalName"
                value={hospitalName}
                onChange={e => setHospitalName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="position"
                label="직책"
                name="position"
                autoComplete="position"
                value={position}
                onChange={e => setPosition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            required
            fullWidth
            id="detailData"
            label="상세 정보"
            name="detailData"
            autoComplete="detailData"
            value={detailData}
            onChange={e => setDetailData(e.target.value)}
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            required
            fullWidth
            id="specialized"
            label="전문 분야"
            name="specialized"
            autoComplete="specialized"
            value={specialized}
            onChange={e => setSpecialized(e.target.value)}
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            required
            fullWidth
            id="medicalSubject"
            label="진료 과목"
            name="medicalSubject"
            autoComplete="medicalSubject"
            value={medicalSubject}
            onChange={e => setMedicalSubject(e.target.value)}
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            required
            fullWidth
            id="birthday"
            label="생년월일"
            name="birthday"
            autoComplete="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
            </Grid>
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
         
        </form>
      </div>
    </Container>
  );
}
export default DoctorAdd