import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery

function JobTypes() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    spec_Name: '',
  });
  const [formErrors, setFormErrors] = useState({
    spec_Name: '',
  });

  const [jobtypeList, setjobtypeList] = useState([]);
  const [editingjobtype, setEditingjobtype] = useState(null);
  const [deletingjobtype, setDeletingjobtype] = useState(null);


  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/JobType/Getjobtype');
      setjobtypeList(response.data);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }

      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'spec_Id' },
          { data: 'spec_Name', title: 'Job Type Name' },
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
      console.error('Error fetching job type list', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const renderActionButtons = (data, type, row) => {
    return (
      '<center>' +
      '<button type="button" class="btn btn-success btn-sm" onclick="window.handleEdit(' +
      row.spec_Id + ', \'' + row.spec_Name +
      '\')"><i class="bi bi-pencil-square"></i> Edit</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleDelete(' +
      row.spec_Id +
      ')">Delete</button>' +
      '</center>'
    );
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      spec_Name: '',
    });
    setFormErrors({
      spec_Name: '',
    });
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

  const handleAddjobtype = async () => {
    try {
      const errors = {};
      if (!formData.spec_Name) {
        errors.spec_Name = 'Job type name is required.';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      if (editingjobtype) {
        await axios.put(`https://localhost:7103/api/JobType/jobtype/${editingjobtype}`, formData);
      } else {
        await axios.post('https://localhost:7103/api/JobType/jobtype', formData);
      }
      console.log('Job type updated successfully');
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error updating job type', error);
    }
  };

  window.handleEdit = (jobtype, spec_Name) => {
    setEditingjobtype(jobtype);
    setFormData({
      spec_Name: spec_Name,
    });
    handleShowModal();
  };

  window.handleDelete = (jobtype) => {
    setDeletingjobtype(jobtype);
    handleShowDeleteModal();
  };

  const handleDeletejobtype = async () => {
    try {
      await axios.delete(`https://localhost:7103/api/JobType/jobtype/${deletingjobtype}`);
      console.log('Job type deleted successfully');
      handleCloseDeleteModal();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting job type', error);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Job Type List</h4>
            <Button variant="danger" size="sm" onClick={handleShowModal}>
              Add Job Type
            </Button>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Job Type Id</th>
                  <th>Job Type Name</th>
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
          <Modal.Title>{editingjobtype ? 'Edit Job Type' : 'Add Job Type'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="spec_Name" className="form-label">
                Job Type Name
              </label>
              <input type="text" className={`form-control ${formErrors.spec_Name ? 'is-invalid' : ''}`} id="spec_Name" name="spec_Name" placeholder="" value={formData.spec_Name} onChange={handleInputChange}/>
              {formErrors.spec_Name && <div className="invalid-feedback">{formErrors.spec_Name}</div>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddjobtype}>
            {editingjobtype ? 'Save changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job type?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeletejobtype}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JobTypes;
