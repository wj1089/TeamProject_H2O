import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './FindIdAndPassword.css';


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



const UserFindID = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);
  // const history = useHistory()

  const handleClose = () => setShow(false);
  const handleCheck = e => {
    e.preventDefault();
    handleClose();
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios.get(`https://server.woojundev.site/H2O/user/findId?name=${name}&phone=${phone}`)
    .then(response => {
      alert('성공')
      setUserId(response.data.userId);
      setShow(!show);
      
    }
    ).catch(
      error => {
        alert(`실패`)
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
          Find ID
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="phone"
                type="phone"
                id="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="current-password"
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
            Find
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/UserFindPW" >
                {"Forgot Password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/Login" >
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>아이디 찾기 결과</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <p>아이디</p>
              <p>{userId}</p>
              
            </div>
            <button
              className="btn btn-primary btn-block mb-2 mt-2"
              onClick={handleCheck}
            >
              확인
            </button>
          </div>
          
        </Modal.Body>
      </Modal>
    </Container>
    

  );
}
export default UserFindID