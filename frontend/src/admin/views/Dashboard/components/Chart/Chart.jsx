import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Menu,
  MenuItem ,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { ChartBar, ChartDounut } from './components';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {},
  chartContainer: {
    height: 300,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  checkBoxStyle : {
    marginRight: theme.spacing(1)
  }
}));

const Chart = props => {
  const { className, data, ...rest } = props;
 

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [chartType, setChartType] = useState("도넛형")

  const [checked, setChecked] = useState({
    checkBox_Age: false,
    checkBox_Sex: false,
    checkBox_Location: false,
    checkBox_days: false,
    checkBox_E: false,
    checkBox_ChartData: ""
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [chartData, setChartData]= useState()
  const [chartData2, setChartData2]= useState()
  const [chartData3, setChartData3]= useState()
  const [chartValue, setChartValue] = useState("")
  const yyyy = new Date().getFullYear()
    

  const [userData, setUserData] = useState([])


  const chartValueInput = props => {
    let i =0
    let j =0
    let k =0
    if(props==="Age"){
      userData.forEach((chart)=>{
        if(yyyy-parseInt(chart.birthday.substr(0,4))>=10
          &&yyyy-parseInt(chart.birthday.substr(0,4))<20
        ){
          i++
        }
      })
    }
    if(props==="Age"){
      userData.forEach((chart)=>{
        if(yyyy-parseInt(chart.birthday.substr(0,4))>=20
          &&yyyy-parseInt(chart.birthday.substr(0,4))<30
        ){
          j++
        }
      })
    }
    if(props==="Age"){
      userData.forEach((chart)=>{
        if(yyyy-parseInt(chart.birthday.substr(0,4))>=30
          &&yyyy-parseInt(chart.birthday.substr(0,4))<40
        ){
          k++
        }
      })
    }
    setChartData(i)
    setChartData2(j)
    setChartData3(k)
    setChartValue(props)

  }





  const handleChange = event => {
    setChecked({checked, [event.target.name]: event.target.checked })
    if(event.target.checked===true){
      switch(event.target.name){
        case "checkBox_Age": return chartValueInput("Age")
        case "checkBox_Sex": return chartValueInput("Sex")
        case "checkBox_Location": return chartValueInput("Location")
        case "checkBox_days": return chartValueInput("Days")
        default: return chartValueInput("Age")
      }
    }
  }

  

  useEffect(()=>{
    setChecked({...checked, checkBox_Age:true})

    axios
      .get(`https://server.woojundev.site/H2O/user/userList`)
      .then(response => {
        setUserData(response.data)
        let data = response.data
        
        const chartValueInput = data => {
          let i =0
          let j =0
          let k =0
            data.forEach((chart)=>{
              if(yyyy-parseInt(chart.birthday.substr(0,4))>=10
                &&yyyy-parseInt(chart.birthday.substr(0,4))<20
              ){
                i++
              }
            })
            data.forEach((chart)=>{
              if(yyyy-parseInt(chart.birthday.substr(0,4))>=20
                &&yyyy-parseInt(chart.birthday.substr(0,4))<30
              ){
                j++
              }
            })
            data.forEach((chart)=>{
              if(yyyy-parseInt(chart.birthday.substr(0,4))>=30
                &&yyyy-parseInt(chart.birthday.substr(0,4))<40
              ){
                k++
              }
            })
          setChartData(i)
          setChartData2(j)
          setChartData3(k)
          setChartValue(response.data)
        }
        chartValueInput(data)



      })
      .catch(error => {
        alert("서버와의 연결이 되지 않았습니다.");
      })
  },[])
  
  //
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} size="small" variant="text" >
          
          {chartType}
        
          <ArrowDropDownIcon />
          </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=> {setAnchorEl(null); setChartType("도넛형"); }}>도넛형</MenuItem>
          <MenuItem onClick={()=> {setAnchorEl(null); setChartType("바형")}}>바형</MenuItem>
        </Menu>
        </div>}
        
        title="이용자수 통계"
      />
      <CardActions>
      <FormGroup 
        row>
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_Age} 
              onChange={handleChange} 
              name="checkBox_Age"
              />}
            label="연령"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_Sex} 
              onChange={handleChange} 
              name="checkBox_Sex" />}
            label="성별"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_Location} 
              onChange={handleChange} 
              name="checkBox_Location" />}
            label="지역"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_days} 
              onChange={handleChange} 
              name="checkBox_days" />}
            label="기간"
        />
        </FormGroup>
      </CardActions>
      <Divider />
      <CardContent>
        {chartType === "도넛형" ? 
          <ChartDounut 
            chartValue = {chartValue}
            chartData = {chartData}
            chartData2 = {chartData2}
            chartData3 = {chartData3}
            data={data}/>: 
            <ChartBar 
            chartValue={chartValue}
            data={data}/>}
      </CardContent>
    </Card>
  );
};

Chart.propTypes = {
  className: PropTypes.string
};

export default Chart;