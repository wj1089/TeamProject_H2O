import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [{
        ticks: { 
            min: 0, 
            stepSize: 10, 
        }
    }]
}
}

const ageData = {
  labels: ['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대 이상'],
  datasets: [
    {
      label: '연령별 이용자',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 34]
    }
  ],
  title: "연령별 이용자"
};

const sexData = {
  labels: ['남성', '여성'],
  datasets: [
    {
      label: '성별 이용자',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      Width: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [55, 45]
    }
  ],
  title: "성별 이용자"
};

const locationData = {
  labels: ['서울시 금천구', '서울시 광진구', '서울시 종로구', '서울시 마포구', '서울시 용산구'],
  datasets: [
    {
      label: '지역별 이용자',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [72,56,33,21,11]
    }
  ],
  title: "지역별 이용자"
};


const daysData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월','10월','11월','12월'],
  datasets: [
    {
      label: '월별 이용자',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 34, 21, 55, 78, 95]
    }
  ],
  title: "기간별 이용자"
};


const ChartBar = props => {  
  const [chart, setChart] = useState({})
  const {chartValue} = props

 

  useEffect(()=>{
      setChart({})
    const switchCase = (param) =>{
      switch(param){
       case "Age": return setChart(ageData) 
       case "Sex": return setChart(sexData) 
       case "Days": return setChart(daysData)
       case "Location": return setChart(locationData)
       default : setChart(ageData) 
         }
        }
    switchCase(chartValue)
  },[chartValue])

 
    if(chartValue) {
      return (
      <div>
        <h2>{chart.title}</h2>
        <Bar 
          data={chart}
          options={options}
        />
      </div>)
    }else{
      return (
        <div>
          <h2>{chart.title}</h2>
          <Bar 
            data={ageData}
            options={options}
          />
        </div>)
      }
    }


  export default ChartBar