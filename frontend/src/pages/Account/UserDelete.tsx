import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from "react-router-dom";
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

const UserDelete = () => {
  
  const classes = useStyles();
  const [userId] = useState(JSON.parse(sessionStorage.userData).userId);
  const [password,setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const history = useHistory()
  
  const handleWithDraw = e => {
    e.preventDefault();
    const userJson = {
      userId: userId,
      password: password,
    }
    if(password === JSON.parse(sessionStorage.userData).password ){
      if( password === confirmPassword ) {
        axios.post(`https://server.woojundev.site/H2O/user/delete`,userJson)
        .then(() => {
          sessionStorage.clear();
          alert("회원탈퇴 완료");
          history.push("/");
        }).catch(
          error => { throw (error) }
        )
      } else {
        alert("비밀번호와 비밀번호 확인이 일치하지않습니다.");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
        setPassword("");
        setConfirmPassword("");
    }
    } 
    

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h2" variant="h5">
          MemberShip WithDraw
        </Typography>
        <form className={classes.form} >



          <Grid container spacing={2}> 
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Confirm Password"
                  type="password"
                  name="password"
                  autoComplete="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
              />
            </Grid>


            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Link to="/Login">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleWithDraw}
          >
            WithDraw
          </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
export default UserDelete