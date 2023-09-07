import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery

function TimeShadule() {
    const auth_userid = localStorage.getItem("id");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    cons_Id: auth_userid,
    time_From: '',
    time_To: '',
  });
  const [formErrors, setFormErrors] = useState({
    cons_Id: auth_userid,
    time_From: '',
    time_To: '',
  });

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      cons_Id: auth_userid,
      time_From: '',
      time_To: '',
    });
    setFormErrors({
      cons_Id: auth_userid,
      time_From: '',
      time_To: '',
    });
  };

  const [editingTimeShadule, seteditingTimeShadule] = useState(null);
  const [deletingTimeShadule, setDeletingTimeShadule] = useState(null);
  const [TimeShadule, setTimeShadule] = useState([]); 

  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7103/api/ConsultantTime/ConsultantTime/${auth_userid}`);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      console.log(response.data);
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'con_Time_Id', title: 'Consultant Time Id' },
          { data: 'time_From', title: 'From Time' },
          { data: 'time_To', title: 'To Time' },
          { data: 'status_type', title: 'Status' },
          {
            data: null,
            render: renderActionButtons,
          },
        ],
        language: {
          emptyTable: 'No data available in table',
        },
      });
    } catch (error) {
      console.error('Error fetching time slot', error);
    }
  };

  const renderActionButtons = (data, type, row) => {
    return (
      '<center>' +
      '<button type="button" class="btn btn-success btn-sm" onclick="window.handleEdit(' +
      row.con_Time_Id + ', \'' + row.time_From + '\', \'' + row.time_To +'\')"><i class="bi bi-pencil-square"></i> Edit</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleDelete(' +
      row.con_Time_Id +
      ')">Delete</button>' +
      '</center>'
    );
  };


  useEffect(() => {
    fetchData();
  }, []);

  window.handleEdit = (Con_Time_Id, Time_From, Time_To) => {
    seteditingTimeShadule(Con_Time_Id);
    setFormData({
        cons_Id: Con_Time_Id,
        time_From: Time_From,
        time_To: Time_To,
    });
    handleShowModal();
};

window.handleDelete = (Con_Time_Id) => {
    setDeletingTimeShadule(Con_Time_Id);
    handleShowDeleteModal();
  };

  const handleDeleteTimeShadule = async () => {
    try {
    await axios.delete(`https://localhost:7103/api/ConsultantTime/ConsultantTime/${deletingTimeShadule}`);
    console.log('User deleted successfully');
    handleCloseDeleteModal();
    window.location.reload();
    } catch (error) {
    console.error('Error deleting time slot', error);
    }
};

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function isValidTimeFormat(input) {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return regex.test(input);
}

  const handleAddTime = async () => {
    try {
      const errors = {};
      if (!formData.time_From) {
        errors.time_From = 'From time is required.';
      }
      if (!formData.time_To) {
        errors.time_To = 'To time is required.';
      }
      if (!isValidTimeFormat(formData.time_From)) {
        errors.time_From = 'Invalid time format. Please enter time in HH:mm:ss format.';
      } 
      if (!isValidTimeFormat(formData.time_To)) {
        errors.time_To = 'Invalid time format. Please enter time in HH:mm:ss format.';
      } 
    
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      if (editingTimeShadule) {
        console.log(formData);
        await axios.put(`https://localhost:7103/api/ConsultantTime/ConsultantTime/${editingTimeShadule}`, formData);
      } else {
        console.log(formData);
        await axios.post('https://localhost:7103/api/ConsultantTime/ConsultantTime', formData);
      }
      console.log('New time slot added successfully');
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('New time slot failed', error);
    }
  };


  return(
    <div>
      <Navbar />
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Consultant available times</h4>
            <Button variant="danger" size="sm" onClick={handleShowModal}>
              Add a new time slot
            </Button>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Consult Id</th>
                  <th>From Time</th>
                  <th>To Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTimeShadule ? 'Edit Time' : 'Add a new time slot'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="mb-3">
              <label htmlFor="time_From" className="form-label">
                From Time
              </label>
              <input type="text" className={`form-control ${formErrors.time_From ? 'is-invalid' : ''}`} id="time_From" name="time_From" placeholder="hh:mm:ss" value={formData.time_From} onChange={handleInputChange} pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"/>
              {formErrors.time_From && <div className="invalid-feedback">{formErrors.time_From}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="time_To" className="form-label">
                To Time
              </label>
              <input type="text" className={`form-control ${formErrors.time_To ? 'is-invalid' : ''}`} id="time_To" name="time_To" placeholder="hh:mm:ss" value={formData.time_To} onChange={handleInputChange} pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"/>
              {formErrors.time_To && <div className="invalid-feedback">{formErrors.time_To}</div>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddTime}>
            {editingTimeShadule ? 'Save Changes' : 'Add time'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this time slot?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteTimeShadule}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TimeShadule;
