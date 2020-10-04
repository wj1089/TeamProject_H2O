import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { MDBBtn} from 'mdbreact';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './map.css'
import { useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MapModal=(props)=> {
  const classes = useStyles();
  const history = useHistory()
  console.log(props.name)
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };
  const handleBack = e => {
    e.preventDefault();
    alert("로그인시 이용 가능합니다.")
    history.push("/")
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const emergancyButton = e =>{
    e.preventDefault();
    alert("중앙응급통제소와 연결을 위해, 전송받은 임시 비밀번호를 입력해주세요.")
    history.push('/TeleMedicine')
  }

  const reservationButton = e => {
    e.preventDefault();
    alert("선택하신 예약서비스로 넘어가겠습니다.")
    history.push(`/CarReservation/${props.content}/${props.name}/${props.startAddr}/${props.endAddr}/${props.postcode}`)
   
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        확인
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">입력정보 확인</h2>
            <p id="transition-modal-description">-------------------------------------------------------------------------</p>

            <p id="transition-modal-description">선택하신 출발지, 목적지, 예약일을 확인해주시고, (긴급, 예약)을 선택해주세요.</p>

            <MDBBtn
              size="lg"
              gradient="blue"          
              onClick={emergancyButton}
              style ={{
                right : '1.5%'
              }}
            >
              긴급서비스
            </MDBBtn>
            {sessionStorage.userData && (

            <MDBBtn
              size="lg"
              style ={{
                right : '1.5%'
              }}
              gradient="blue" onClick={reservationButton} >진료 예약
            </MDBBtn>

            )}

            {!sessionStorage.userData &&
            <MDBBtn
              size="lg"
              style ={{
                right : '1.5%'
              }}
              gradient="blue" onClick={handleBack} >진료 예약
            </MDBBtn>}
          </div>
        </Fade>
      </Modal>


    </div>
  );
}
export default MapModal;
