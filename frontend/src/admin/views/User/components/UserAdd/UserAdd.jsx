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
    margin: theme.spacing(3, 0, 2),
  },
}));


const UserAdd = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [birthday, setBirthday] = useState("")
  const [idChecker, setIdChecker] = useState("")

  const history = useHistory();

  const handleIdCheck = e => {
      setIdChecker("")
      if(userId){
      e.preventDefault();
      axios
        .get(`https://server.woojundev.site/H2O/user/idCheck/${userId}`)
        .then(response => {
          alert("이미 존재하는 아이디 입니다.");
          setIdChecker("unavailable")
        })
        .catch(error => {
          alert("사용한 가능한 아이디 입니다.");
          setIdChecker("available")
        })
      }else{
        alert("아이디 중복을 확인하세요.")
      }
  }

  const handleSubmit = e => {
    if(password && userId){
    e.preventDefault();
    setIdChecker("")
    const userJson = {
      userId: userId,
      password: password,
      name: name,
      email: email,
      phone: phone,
      birthday: birthday
    }
    if(idChecker==="available"){
      axios.post(`https://server.woojundev.site/H2O/user/signUp`, userJson)
        .then(response => {
          alert("회원가입 성공 !")
          history.push("/admin/account")
            }
        ).catch(
          
        error => { 
          alert("회원가입 실패")
          throw (error) 
        }
      );
      }else if(idChecker==="unavailable"){
        alert("아이디가 이미 존재합니다.")
      }else{
        alert("아이디 중복체크 해주세요.")
      }
    }else{
      alert("입력되지 않은 정보가 있습니다.")
    }
  }

  const handleCancel = () => {
    history.push('/admin/users')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
          사용자 등록
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userId"
                  label="아이디"
                  name="userId"
                  autoComplete="userId"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end"
            >
              <Button variant="outlined" color="secondary" onClick={handleIdCheck}>
                아이디<br/>
                중복 확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="연락처"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
export default UserAdd