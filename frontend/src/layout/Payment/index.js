import React from 'react';
import {useHistory} from 'react-router-dom';
import { MDBBtn} from 'mdbreact';
import queryString from 'query-string';
import  { useDispatch } from 'react-redux';

const POST_RESERVATION_DATA = 'POST_RESERVATION_DATA'
//액션

export const reservationAction = data => ({type:POST_RESERVATION_DATA, payload:data})
//액션 생성기

export const reservationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'POST_RESERVATION_DATA' : return action.payload
        default: return state;
    }
}

const Payment = (props) => {

  const history = useHistory();

  const dispatch = useDispatch();

  // 날짜 보기 편하게 변경
  var dateReplace = props.selectedDate
  
  var selectedDate = dateReplace.replace('T',' 일 ')

  const reservationData={
    title : props.title,
    name : props.name,
    hospitalName : props.hospitalName,
    medicalSubject : props.medicalSubject,
    selectedDate : selectedDate,
    startAddr : props.startAddr,
    endAddr : props.endAddr,
    postcode : props.postcode,
    content : props.content
}

  dispatch(reservationAction({reservationData}))


    const onClickPayment = () => {
        const { IMP } = window;
        IMP.init('imp75154757');
    
        const data = {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name : '병원예약', //주문명
            amount: '5000', // 가격
            buyer_name : '홍길동', // 구매자 이름
            buyer_tel: '010-1234-5678', // 구매자 번호
            buyer_email: 'limup3@gmail.com' // 구매자 이메일
        }
    
        IMP.request_pay(data, callback);
    }

   

    function callback(response) {
        const query = queryString.stringify(response);
        history.push(`/payment/result?${query}`);
      }
      return (
        <>
            <MDBBtn 
            gradient="purple" 
            size="lg" 
            onClick={() => onClickPayment()}

            >결제하기</MDBBtn>
        </>
    );

}

export default Payment