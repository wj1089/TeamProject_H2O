import React, {useState } from 'react';
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

const UserTestBody = (props) => {
    const classes = useStyles();
    const {UserData, setClose, className} = props
    const [userId, setUserId] = useState(UserData.userId)
    const [name, setName] = useState(UserData.name);
    const [password, setPassword] = useState(UserData.password)
    const [email, setEmail] = useState(UserData.email);
    const [phone, setPhone] = useState(UserData.phone)
    const [birthday, setBirthday] = useState(UserData.birthday)    

    const history = useHistory();


    const handleClose = () => {
      setClose(false);
    }
   
    const handelModify = e => {
      const UserJson = {
        userId: userId,
        password: password,
        name: name,
        email: email,
        phone: phone,
        birthday: birthday
      }
      Axios
        .patch(`https://server.woojundev.site/H2O/user/modify/{userId}`, UserJson)
        .then(response => {
          alert("병원 데이터 변경 성공")
          setClose(false);
          history.push("/admin")
          history.push("/admin/users")

        })
        .catch(
          error => {
            alert("유저 데이터 변경 실패")
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
            title={<h3>{UserData.name}</h3>}
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
                  defaultValue={UserData.userId}
                  disabled 
                  label="유저 ID"
                  margin="dense"
                  name="userId"
                  onChange={e => setUserId(e.target.value)}
                  required
                  value={userId}
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
                  defaultValue={UserData.password}
                  label="비밀번호"
                  margin="dense"
                  type="password"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  value={password}
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
                  defaultValue={UserData.name}
                  label="이름"
                  margin="dense"
                  name="name"
                  onChange={e => setName(e.target.value)}
                  required
                  value={name}
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
                  defaultValue={UserData.email}
                  label="이메일"
                  margin="dense"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  required
                  value={email}
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
                  defaultValue={UserData.phone}
                  label="연락처"
                  margin="dense"
                  name="phone"
                  onChange={e => setPhone(e.target.value)}
                  required
                  value={phone}
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
                  defaultValue={UserData.birthday}
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
  
  UserTestBody.propTypes = {
    className: PropTypes.string
  };
  
  export default UserTestBody;