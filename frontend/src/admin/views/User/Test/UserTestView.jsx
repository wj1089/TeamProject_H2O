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
} from '@material-ui/core';
import { Modal } from 'react-bootstrap'
import UserTestBody from './UserTestBody';
import PropTypes from 'prop-types';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const tableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  TablePagination:{
    alignItems: "center"
  },
  backGroundColor: {
    backgroundColor: "#282C34"
  },
  fontColor : {
    color:'white'
  }
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
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
const UserTestView = () => {
  const tableClasses = tableStyles();

    const [UserData, setUserData] = useState([])
    const [show, setShow] = useState(false);
    // --------------Pagination ------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // -------------------- Sort -----------------------
    const [sort, setSort]=useState({
      no:  "Basic" || "Asc" || "Dsc",
      name: "Basic" || "Asc" || "Dsc",
      id: "Basic" || "Asc" || "Dsc",
      birthday: "Basic" || "Asc" || "Dsc"
    })
    const [sendList, setSendList] =useState([])

    useEffect(()=>{
      axios
        .get(`https://server.woojundev.site/H2O/user/userList`)
        .then(response => {
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
        if(a.userNo > b.userNo){
          return 1;
        }
        if(a.userNo < b.userNo){
          return -1;
        }
        return 0
        }
      )
    }

    const handleSortName = () => {
      if(sort.name==="Basic"){
        setSort({...sort, name:"Asc"})
        sendList.sort(function(a,b){
          let nameA = a.name.toUpperCase()
          let nameB = b.name.toUpperCase()
          if(nameA > nameB){
            return 1;
          }
          if(nameA < nameB){
            return -1;
          }
          return 0
          }
        )
      }

      if(sort.name==="Asc"){
        setSort({...sort, name:"Dsc"})
        sendList.sort(function(a,b){
          let nameA = a.name.toLowerCase()
          let nameB = b.name.toLowerCase()
          if(nameA < nameB){
            return 1;
          }
          if(nameA > nameB){
            return -1;
          }
          return 0

          }
        )
      }
        if(sort.name==="Dsc"){
        setSort({...sort, name:"Basic"})
        basicSort()
      }
    }

    const handleSortNo = () => {
      if(sort.no==="Basic"){
        setSort({...sort, no:"Asc"})

        sendList.sort(function(a,b){
          if(a.userNo > b.userNo){
            return 1;
          }
          if(a.userNo < b.userNo){
            return -1;
          }
          return 0
          }
        )

        }
      if(sort.no==="Asc"){
      setSort({...sort, no:"Dsc"})

      sendList.sort(function(a,b){
        if(a.userNo > b.userNo){
          return -1;
        }
        if(a.userNo < b.userNo){
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

    const handleSortId = () => {
      if(sort.id==="Basic"){
        setSort({...sort, id:"Asc"})
        sendList.sort(function(a,b){
          let idA = a.userId.toLowerCase()
          let idB = b.userId.toLowerCase()
          if(idA < idB){
            return -1;
          }
          if(idA > idB){
            return 1;
          }
          return 0
          }
        )
      }
      if(sort.id==="Asc"){
        setSort({...sort, id:"Dsc"})
        sendList.sort(function(a,b){
          let idA = a.userId.toLowerCase()
          let idB = b.userId.toLowerCase()
          if(idA < idB){
            return 1;
          }
          if(idA > idB){
            return -1;
          }
          return 0
          }
        )
      }if(sort.id==="Dsc"){
        setSort({...sort, id:"Basic"})
        basicSort()
      }
    }

    const handleSortBirthday = () => {
      if(sort.birthday==="Basic"){
        setSort({...sort, birthday:"Asc"})
        sendList.sort(function(a,b){
          a = new Date(a.birthday)
          b = new Date(b.birthday)
          return a>b? 1: a<b? -1: 0
        }
        )}
        
      if(sort.birthday==="Asc"){
        setSort({...sort, birthday:"Dsc"})
        sendList.sort(function(a,b){
          a = new Date(a.birthday)
          b = new Date(b.birthday)
          return a>b? -1: a<b? 1: 0
        }
        )}
      if(sort.birthday==="Dsc"){
        setSort({...sort, birthday:"Basic"})
        basicSort()
      }
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sendList.length - page * rowsPerPage);

    return (
        <>
        <Card>
        <TableContainer component={Paper}>
          <Table className={tableClasses.table}
          >
            <TableRow 
              className={tableClasses.fontColor}>
              <TableCell componenent="th" align="center" scope="row">
                <MuiButton
                  onClick={handleSortNo}
                  >
                    No.
                    {sort.no==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                    {sort.no==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                  </MuiButton>
                </TableCell>
              <TableCell align="center">
                <MuiButton
                  onClick={handleSortName}
                  >
                    이름
                    {sort.name==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                    {sort.name==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                </MuiButton>
              </TableCell>
              <TableCell align="center">
              <MuiButton
                  onClick={handleSortId}
                  >
                유저 ID
                  {sort.id==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                  {sort.id==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                 </MuiButton>
                </TableCell>
              <TableCell align="center">연락처</TableCell>
              <TableCell align="center">이메일 주소</TableCell>
              <TableCell>
              <MuiButton
                  onClick={handleSortBirthday}
                  >
                생년월일
                  {sort.birthday==="Asc" && <ArrowUpwardIcon fontSize="small"/>}
                  {sort.birthday==="Dsc" && <ArrowDownwardIcon fontSize="small"/>}
                 </MuiButton>
                </TableCell>
              <TableCell align="center">

              </TableCell>
            </TableRow>
              <TableBody>
                {/* -------------pagination----------------- */}
                  {(rowsPerPage > 0

                    ? sendList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : sendList

                    
                    ).map((User, i) => (
                      

                  <TableRow
                    align="center"
                    key={i}
                    onClick={()=>setUserData(User)}
                  >
                    <TableCell align="center">{User.userNo}</TableCell>
                    <TableCell align="center">
                      <MuiButton variant="light" onClick={()=>setShow(true)}
                      >{User.name}
                      </MuiButton>
                    </TableCell>
                    <TableCell align="center">{User.userId}</TableCell>
                    <TableCell align="center">{User.phone}</TableCell>
                    <TableCell align="center">{User.email}</TableCell>
                    <TableCell align="center">{User.birthday}</TableCell>
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
              {UserData.name? (
                <Modal 
                  show={show} 
                  onHide={handleClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  scrollable={Boolean(true)}
                  >
                <Modal.Header closeButton>
                  <Modal.Title>등록된 유저 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UserTestBody 
                    UserData={UserData} 
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
export default UserTestView