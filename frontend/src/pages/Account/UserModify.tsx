import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserModify = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState(JSON.parse(sessionStorage.userData).userId);
  const [password, setPassword] = useState(JSON.parse(sessionStorage.userData).password);
  const [userName, setUserName] = useState(JSON.parse(sessionStorage.userData).name);
  const [email, setEmail] = useState(JSON.parse(sessionStorage.userData).email);
  const [phoneNumber, setPhoneNumber] = useState(JSON.parse(sessionStorage.userData).phone)
  const [birthday, setBirthday] = useState(JSON.parse(sessionStorage.userData).birthday)

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault()
    const userJson = {
      userId: userId,
      password: password,
      name: userName,
      email: email,
      phone: phoneNumber,
      birthday: birthday
    }
    axios.patch(`https://server.woojundev.site/H2O/user/modify/${userId}`, userJson)
          .then(response => {
            alert("데이터 변경 성공")
            sessionStorage.clear()
            history.push("/")
          }
          ).catch(
            error => {
              alert("데이터 변경 실패")
              throw (error)
            }
          )
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h2" variant="h5">
          MyPage
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="userId"
                name="userId"
                variant="filled"
                disabled
                fullWidth
                id="userId"
                label="userId"
                autoFocus
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="userName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="UserName"
                autoFocus
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="phoneNumber"
                name="phoneNumber"
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="PhoneNumber"
                autoFocus
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
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
            label="Birthday"
            name="birthday"
            autoComplete="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            />
            </Grid>
            <Grid item xs={12}>
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
            Change
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/UserDelete" >
                {"Do you want to withdraw from membership?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default UserModify