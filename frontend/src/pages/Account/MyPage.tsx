import React from "react";
import { Grid } from '@material-ui/core';
import { Container } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 150,
    margin: "20px",
    justifyContent: 'center'
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 14,
  },
});

const Mypage = () => {
  const classes = useStyles();


  return (
    <div>
      <br/>    
<Container>
<Grid
  container
  justify="flex-end" 
>
<Button variant="contained" color="secondary" href="/UserModify" >회원 정보 수정</Button>
</Grid>
<Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
          <Card className={classes.root} variant="outlined">
          <CardContent >
          <Typography variant="h5" component="h2">
          나의 글목록
        </Typography>
          </CardContent>
          <CardActions className={classes.root}>
            <Button size="medium">10</Button>
          </CardActions>
        </Card>
        
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
          자주가는 병원
        </Typography>
          </CardContent>
          <CardActions className={classes.root}>
            <Button size="medium">10</Button>
          </CardActions>
        </Card>
        
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
          나의 처방전
        </Typography>
          </CardContent>
          <CardActions className={classes.root}>
            <Button size="medium">10</Button>
          </CardActions>
        </Card>
</Grid>
<Grid
  className={classes.root}
  container
  direction="column"
  justify="center" 
  alignItems="center"
>
  
<Button variant="outlined" color="primary" size="large">결제 카드 등록/변경</Button>
</Grid>
<Grid
  className={classes.root}
  container
  direction="column"
  justify="center" 
  alignItems="center"
>
<Button variant="outlined" color="primary" size="large">&nbsp;&nbsp;&nbsp;&nbsp; 1:1 문의하기 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Button>
</Grid>

</Container>
</div>
      );
    }
export default Mypage