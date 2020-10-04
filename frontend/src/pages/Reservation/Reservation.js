import React, { useState } from "react";
import './Reservation.css'
import Payment from "../../layout/Payment";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MDBCard, MDBCardBody, MDBCardTitle,  MDBCol, MDBRow } from 'mdbreact';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Reservation = ({match}) =>  {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var hours = today.getHours(); // 시
  var minutes = today.getMinutes();  // 분
  if(dd<10) {
      dd='0'+dd
  } 
  if(mm<10) {
      mm='0'+mm
  } 
  today = yyyy+'-'+mm+'-'+dd+'T'+hours+':'+minutes;

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(today)
  const title = "방문진료"


  return (

    <div>

<MDBCol>
  <br/><br/><br/>
      <MDBCard 
      style={{ width: "40%",
               left: "35%",
            }}>
        <br/>      
        <MDBCardTitle className='text-center'>
              <strong>{title} 예약 </strong>
            </MDBCardTitle>
            <br/>  
          <div className={"reservation"}>
          <form className={classes.container} noValidate>
         <TextField
        id="datetime-local"
        label="Reservation"
        type="datetime-local"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
          </div>
            
            <br/>  
        <MDBCardBody>
          
        <h5 className="padding">            
              병원 이름 : {match.params.hospitalName}{' '}            
        </h5>
        <br/>
        <h5 className="padding">           
              의사 : {match.params.name}{' '}          
        </h5>
        <br/>
        <h5 className="padding">
              진료과 : {match.params.medicalSubject}{' '}
        </h5>
        <br/>
        <h5 className="padding">
              예약 비용 : 5000원{' '}
        </h5>
        <br/>

        <br/>  

    <MDBRow>
    <MDBCol md="4">
    </MDBCol>
    <MDBCol md="8">
    <Payment
     title={title} 
     hospitalName={match.params.hospitalName} 
     name={match.params.name} 
     medicalSubject={match.params.medicalSubject}
     selectedDate={selectedDate}
     />
    </MDBCol>
    </MDBRow>
  
    <br/>    
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </div>

  );
}
export default Reservation