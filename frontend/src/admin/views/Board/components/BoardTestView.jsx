import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios'
import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Button as MuiButton,
  TablePagination,
  Paper,
  IconButton,
  Select 
} from '@material-ui/core';
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import BoardTestBody from './BoardTestBody';

const tableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  TablePagination:{
    alignItems: "center"
  },
  color: {
    backgroundColor: "#282C34"
  }
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(1.5),
  },
}));

const selectStyle = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));


const TablePaginationActions = (props) => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
return (
  <div className={classes.root}>
    <IconButton
      onClick={handleFirstPageButtonClick}
      disabled={page === 0}
      aria-label="first page"
    >
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    </IconButton>
    <IconButton
      onClick={handleNextButtonClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="next page"
    >
      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
    <IconButton
      onClick={handleLastPageButtonClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="last page"
    >
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
  </div>
);
}
TablePaginationActions.propTypes = {
count: PropTypes.number.isRequired,
onChangePage: PropTypes.func.isRequired,
page: PropTypes.number.isRequired,
rowsPerPage: PropTypes.number.isRequired,
};
const BoardTestView = () => {
  const tableClasses = tableStyles();
  const selectBox = selectStyle()

    const [hospitalData, setHospitalData] = useState([])
    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false);
    // --------------Pagination ------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // -------------------- Sort -----------------------
    const [sort, setSort]=useState({
      no:  "Basic" || "Asc" || "Dsc",
      title: "Basic" || "Asc" || "Dsc",
      category: "Basic" || "Asc" || "Dsc",
      click: "Basic" || "Asc" || "Dsc",
    })
    const [status, setStatus] = useState("전체보기")
    const [sendList, setSendList] =useState([])

    useEffect(()=>{
      axios
        .get(`https://server.woojundev.site/H2O/board/boardList`)
        .then(response => {
          setPosts(response.data)
          setSendList(response.data)
        })
        .catch(error => {
          alert("서버와의 연결이 되지 않았습니다.");
        })
    }, [])
    const handleClose = () => {
      setShow(false)
    }
    // ----------------- Pagination -----------------------------
    const handleChangePage = (e, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    };
    // ------------------- Sort ------------------------------
    const basicSort = () => {
      sendList.sort(function(a,b){
        if(a.boardNo > b.boardNo){
          return 1;
        }
        if(a.boardNo < b.boardNo){
          return -1;
        }
        return 0
        }
      )
    }

    const handleSortTitle = () => {
      if(sort.title==="Basic"){
        setSort({...sort, title:"Asc"})
        sendList.sort(function(a,b){
          let boardTitleA = a.title.toUpperCase()
          let boardTitleB = b.title.toUpperCase()
          if(boardTitleA > boardTitleB){
            return 1;
          }
          if(boardTitleA < boardTitleB){
            return -1;
          }
          return 0
          }
        )
      }

      if(sort.title==="Asc"){
        setSort({...sort, title:"Dsc"})
        sendList.sort(function(a,b){
          let boardTitleA = a.title.toLowerCase()
          let boardTitleB = b.title.toLowerCase()
          if(boardTitleA < boardTitleB){
            return 1;
          }
          if(boardTitleA > boardTitleB){
            return -1;
          }
          return 0

          }
        )

      }
        if(sort.title==="Dsc"){
        setSort({...sort, title:"Basic"})
        basicSort()
      }
    }

    const handleSortNo = () => {
      if(sort.no==="Basic"){
        setSort({...sort, no:"Asc"})

        sendList.sort(function(a,b){
          if(a.boardNo > b.boardNo){
            return 1;
          }
          if(a.boardNo < b.boardNo){
            return -1;
          }
          return 0
          }
        )

        }
      if(sort.no==="Asc"){
      setSort({...sort, no:"Dsc"})

      sendList.sort(function(a,b){
        if(a.boardNo > b.boardNo){
          return -1;
        }
        if(a.boardNo < b.boardNo){
          return 1;
        }
        return 0
        }
      )

        
        }
      if(sort.no==="Dsc"){
      setSort({...sort, no:"Basic"})
      basicSort()
      }
    }



    const handleSortClick = () => {
      if(sort.click==="Basic"){
        setSort({...sort, click:"Asc"})

        sendList.sort(function(a,b){
          if(a.click > b.click){
            return 1;
          }
          if(a.click < b.click){
            return -1;
          }
          return 0
          }
        )

        }
      if(sort.click==="Asc"){
      setSort({...sort, click:"Dsc"})

      sendList.sort(function(a,b){
        if(a.click > b.click){
          return -1;
        }
        if(a.click < b.click){
          return 1;
        }
        return 0
        }
      )

        
        }
      if(sort.click==="Dsc"){
      setSort({...sort, click:"Basic"})
      basicSort()
      }
    }

    // ----------------------- dropdown ---------------------------
    
    const handleChangeCategory = event => {
      setStatus(event.target.value)
      if(event.target.value==="전체보기"){
        setSendList(posts)
      }else{
        setSendList([])
        posts.forEach(post=>{
          if(event.target.value==="category" && post.category === "자유게시판"){
            setSendList((sendList)=>[...sendList, post])
          }else if(event.target.value==="questionCategory" && post.category === "Q&A"){
            setSendList((sendList)=>[...sendList, post])
          }else if(event.target.value==="customerCategory" && post.category === "고객서비스센터"){
          setSendList((sendList)=>[...sendList, post])
          }
        })
     } 
    }
    




    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sendList.length - page * rowsPerPage);

    return (
        <>
        <Card>
        <TableContainer component={Paper}>
          <Table className={tableClasses.table} aria-label="custom pagination table"
          >
            <TableRow style={{width:10}}>
              <TableCell componenent="th" align="center" scope="row">
                <MuiButton 
                  onClick={handleSortNo}>
                    No.
                    {sort.no==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                    {sort.no==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                  </MuiButton>
                </TableCell>
              <TableCell align="center" style={{width:50}}> 글쓴이 </TableCell>
              <TableCell align="center">
                
              <FormControl className={selectBox.formControl}>
                 <InputLabel>카테고리</InputLabel>
                  <Select
                    value={status}
                    onChange={handleChangeCategory}>
                      <MenuItem value="전체보기">전체보기</MenuItem>
                      <MenuItem value="category">자유게시판</MenuItem>
                      <MenuItem value="customerCategory">고객서비스</MenuItem>
                      <MenuItem value="questionCategory">질의응답</MenuItem>
                    </Select>
                  </FormControl>
              </TableCell>
              <TableCell align="center" style={{width:100}}>카테고리</TableCell>

              <TableCell align="center">
                <MuiButton
                  onClick={handleSortTitle}
                  style={{width:"auto"}}>
                    제목
                    {sort.title==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                    {sort.title==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                </MuiButton>
              </TableCell>
              <TableCell align="center">내용</TableCell>
              <TableCell align="center" style={{width:50}}><MuiButton
                  onClick={handleSortClick}>
                    조회수
                    {sort.click==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                    {sort.click==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                  </MuiButton></TableCell>
              
            </TableRow>
              <TableBody>
                {/* -------------pagination----------------- */}
                  {(rowsPerPage > 0

                    ? sendList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : sendList

                    
                    ).map((hospital, i) => (
                      

                  <TableRow
                    align="center"
                    key={i}
                    onClick={()=>setHospitalData(hospital)}
                  >
                    <TableCell align="center">{hospital.boardNo}</TableCell>
                    <TableCell align="center">
                      <MuiButton variant="light" onClick={()=>setShow(true)}
                      >{hospital.userNo}
                      </MuiButton>
                    </TableCell>
                    <TableCell align="center">{hospital.category}</TableCell>
                    <TableCell align="center">{hospital.medCategory}</TableCell>
                    <TableCell align="center">{hospital.title}</TableCell>
                    <TableCell align="center">{hospital.content}</TableCell>
                    <TableCell align="center">{hospital.click}</TableCell>
                  </TableRow>

                    
                    
                    
                    
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
          )}
              </TableBody>
              {/* ---------------------- Pagination ----------------------------------- */}
              <TableFooter>
              <TableRow>
                <TablePagination
                  classesName ={tableClasses.TablePagination}
                  rowsPerPageOptions={[10, 50, 100, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={sendList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
            {/* ---------------------- Pagination ----------------------------------- */}
              {hospitalData.hospitalName? (
                <Modal 
                  show={show} 
                  onHide={handleClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  scrollable={Boolean(true)}
                  >
                <Modal.Header closeButton>
                  <Modal.Title>등록 병원 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <BoardTestBody 
                    hospitalData={hospitalData} 
                    setClose={(close)=>{setShow(close)}}
                    />
                  </Modal.Body>
              </Modal>):null}
          </Table>
        </TableContainer>
        </Card>
        {/* -----------Pagination------------ */}
        </>
    )
}
export default BoardTestView