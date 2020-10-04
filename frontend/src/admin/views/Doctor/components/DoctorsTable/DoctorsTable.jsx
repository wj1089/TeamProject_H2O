import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Button, Modal } from 'react-bootstrap';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button as MuiButton
} from '@material-ui/core';

import DoctorAccount from '../../DoctorAccount'
import { getInitials } from '../../../../helpers';



const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  headscheama: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}));


const DoctorsTable = props => {
  const { className, doctors, ...rest } = props;

  const classes = useStyles();

  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { doctors } = props;

    let selectedDoctors;

    if (event.target.checked) {
      selectedDoctors = doctors.map(doctor => doctor.id);
    } else {
      selectedDoctors = [];
    }

    setSelectedDoctors(selectedDoctors);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDoctors.indexOf(id);
    let newSelectedDoctors = [];

    if (selectedIndex === -1) {
      newSelectedDoctors = newSelectedDoctors.concat(selectedDoctors, id);
    } else if (selectedIndex === 0) {
      newSelectedDoctors = newSelectedDoctors.concat(selectedDoctors.slice(1));
    } else if (selectedIndex === selectedDoctors.length - 1) {
      newSelectedDoctors = newSelectedDoctors.concat(selectedDoctors.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDoctors = newSelectedDoctors.concat(
        selectedDoctors.slice(0, selectedIndex),
        selectedDoctors.slice(selectedIndex + 1)
      );
    }

    setSelectedDoctors(newSelectedDoctors);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

// ModalLine-------------------------------------------- START

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// ModalLine-------------------------------------------- END
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow 
                    className={classes.headscheama}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDoctors.length === doctors.length}
                      color="primary"
                      indeterminate={
                        selectedDoctors.length > 0 &&
                        selectedDoctors.length < doctors.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>나이</TableCell>
                  <TableCell>직책</TableCell>
                  <TableCell>진료과목</TableCell>
                  <TableCell>전문분야</TableCell>
                  <TableCell>등록일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.slice(0, rowsPerPage).map(doctor => (
                  <TableRow
                    className={classes.tableRow, classes.headscheama}
                    hover
                    key={doctor.id}
                    selected={selectedDoctors.indexOf(doctor.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedDoctors.indexOf(doctor.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, doctor.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={doctor.avatarUrl}
                        >
                          {getInitials(doctor.doctorName)}
                        </Avatar>
                        <Typography variant="body1">
                        {/* -------------------- Modal Line ------------------ */}
                        
                        <MuiButton 
                          variant="primary" 
                          onClick={handleShow} 
                          className={classes.headscheama}>
                            {doctor.doctorName}
                        </MuiButton>
                        <Modal 
                          {...props} 
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
                        <Modal.Body><DoctorAccount/></Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={handleClose}>
                            저장
                          </Button>
                          <Button variant="secondary" onClick={handleClose}>
                            취소
                          </Button>
                        </Modal.Footer>
                      </Modal>
                        {/* -------------------- Modal Line ------------------ */}
                        </Typography>

                      </div>
                    </TableCell>
                    <TableCell >{doctor.age}</TableCell>
                    <TableCell>
                      {doctor.position}
                    </TableCell>
                    <TableCell >{doctor.detailData}</TableCell>
                    <TableCell >{doctor.medicalSubject}</TableCell>
                    <TableCell >
                      {moment(doctor.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={doctors.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

DoctorsTable.propTypes = {
  className: PropTypes.string,
  doctors: PropTypes.array.isRequired
};

export default DoctorsTable;