import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { MDBBtn} from 'mdbreact';
import { Modal } from 'react-bootstrap';
import shortId from 'shortid'
import './PaymentResult.css'
import axios from 'axios'


const PaymentResult = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectorData = {
    title : useSelector(state => state.reservationReducer.reservationData.title),
    hospitalName : useSelector(state => state.reservationReducer.reservationData.hospitalName),
    doctor : useSelector(state => state.reservationReducer.reservationData.name),
    selectedDate : useSelector(state => state.reservationReducer.reservationData.selectedDate),
    medicalSubject : useSelector(state => state.reservationReducer.reservationData.medicalSubject),
    startAddr : useSelector(state => state.reservationReducer.reservationData.startAddr),
    endAddr : useSelector(state => state.reservationReducer.reservationData.endAddr),
    postcode : useSelector(state => state.reservationReducer.reservationData.postcode),
    content : useSelector(state => state.reservationReducer.reservationData.content),

  }



  const history = useHistory();
  const { location } = history;
  const { search } = location;
  const query = queryString.parse(search);

  const handleBack = e => {
    e.preventDefault()
    history.push('/')
    window.location.reload()
  }
  const { error_msg} = query;
  const isSuccessed = getIsSuccessed();
  function getIsSuccessed() {
    const { success, imp_success } = query;
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  const iconType = isSuccessed ? 'check-circle' : 'exclamation-circle';
  const resultType = isSuccessed ? '성공' : '실패';
  const colorType = isSuccessed ? '#52c41a' : '#f5222d';

  useEffect(()=> {

    const reservationJson = {
      reservationType : selectorData.title,
      date : selectorData.selectedDate,

    }

    if(resultType === '성공') {
      axios.post(`https://server.woojundev.site/H2O/reservation/register`, reservationJson)
      .then(res => {
        }
      ).catch(
        
        error => {
        throw (error)
        }
      )
    }

  },[resultType])


  return (
    <Wrapper>
      <Container colorType={colorType}>
        <Icon type={iconType} theme="filled" />
        <p>{`결제에 ${resultType}하였습니다`}</p>
        <ul>
          <li>
            <span>사용자 </span>
            <span>{JSON.parse(sessionStorage.userData).name}</span>
          </li>

          {isSuccessed  ? (
            <>
             <li>
             <span>병원 </span>
             <span>{selectorData.hospitalName}</span>
           </li>
           <br/>
            <h5 className="textColor"> 예약정보를 확인해주세요 !! </h5>
            </>
          ) : (
            <li>
              <span>에러 메시지</span>
              <span>{error_msg}</span>
            </li>
          )}
          
        </ul>
        
        {isSuccessed && selectorData.title === "방문진료"  &&
        <>
        <Button 
        className="textColor"
        onClick={handleShow} >예약정보</Button>
        <br/>
        <Modal 
          show={show} 
          onHide={handleClose}
          
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable={Boolean(true)}
          >
        <Modal.Header closeButton>
          <Modal.Title>{selectorData.title} 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p> 예약날짜  &nbsp; {selectorData.selectedDate}</p>
            <br/>
         
            <p>고객  &emsp;&emsp; {JSON.parse(sessionStorage.userData).name}</p>
            <br/>
        
            <p>병원  &emsp;&emsp; {selectorData.hospitalName}</p>
            <br/>
            <p>진료과  &emsp; {selectorData.medicalSubject}</p>
            
    
            <br/>
            <p>의사  &emsp;&emsp; {selectorData.doctor}</p>
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn gradient="purple" onClick={handleClose}>
            확인
          </MDBBtn>
        </Modal.Footer>
        </Modal>
            </>
            }
            
        {isSuccessed && selectorData.title === "화상진료"  &&
        <>
        <Button 
        className="textColor"
        onClick={handleShow} >예약정보</Button>
        <br/>
        <Modal 
          show={show} 
          onHide={handleClose}
          
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable={Boolean(true)}
          >
        <Modal.Header closeButton>
          <Modal.Title>{selectorData.title} 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p> 예약날짜  &nbsp; {selectorData.selectedDate}</p>
            <br/>

            <p> 화상진료  &nbsp; {shortId.generate()}</p>
            <p className="textColorSize"> 예약시간 10분전에 화상진료 아이디로 접속해주세요</p>
         
            <p>고객  &emsp;&emsp; {JSON.parse(sessionStorage.userData).name}</p>
            <br/>
        
            <p>병원  &emsp;&emsp; {selectorData.hospitalName}</p>
            <br/>
            <p>진료과  &emsp; {selectorData.medicalSubject}</p>
            
            <br/>
            <p>의사  &emsp;&emsp; {selectorData.doctor}</p>
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn gradient="purple" onClick={handleClose}>
            확인
          </MDBBtn>
        </Modal.Footer>
        </Modal>
            </>
            }

      {isSuccessed && selectorData.title === "응급차"  &&
        <>
          <Button
            className="textColor"
            onClick={handleShow} >예약정보</Button>
          <br/>
          <Modal
            show={show}
            onHide={handleClose}

            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={Boolean(true)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{selectorData.title} 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> 예약날짜  &nbsp; {selectorData.selectedDate}</p>
              <br/>

              <p>고객  &emsp;&emsp; {JSON.parse(sessionStorage.userData).name}</p>
              <br/>

              <p>병원  &emsp;&emsp; {selectorData.hospitalName}</p>
              <br/>

              <p>출발지  &emsp; {selectorData.startAddr}</p>
              <br/>

              <p>도착지  &emsp; {selectorData.endAddr}</p>
              <br/>

              <p>우편번호  &emsp; {selectorData.postcode}</p>
              <br/>

              <p>내용  &emsp;&emsp; {selectorData.content}</p>
            </Modal.Body>
            <Modal.Footer>
              <MDBBtn gradient="purple" onClick={handleClose}>
                확인
              </MDBBtn>
            </Modal.Footer>
          </Modal>
        </>
        }

        <br/>

        

        <Button size="large" onClick={handleBack}>
          <Icon type="arrow-left" />
          돌아가기
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;

  > .anticon {
    font-size: 10rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${props => props.colorType};
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 3rem;

    li {
      display: flex;
      line-height: 2;
      span:first-child {
        width: 8rem;
        color: #888;
      }
      span:last-child {
        width: calc(100% - 8rem);
        color: #333;
      }
    }
  }

  button, button:hover {
    border-color: ${props => props.colorType};
    color: ${props => props.colorType};
  }
  button:hover {
    opacity: 0.7;
  }
`;

export default PaymentResult;