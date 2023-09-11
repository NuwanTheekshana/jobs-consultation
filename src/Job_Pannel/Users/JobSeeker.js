import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import Swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function JobSeeker() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    FName: '',
    LName: '',
    UserName: '',
    NIC: '',
    DOB: '',
    Email: '',
    TelNo: '',
    Address: '',
    Password: '',
  });
  const [formErrors, setFormErrors] = useState({
    FName: '',
    LName: '',
    UserName: '',
    NIC: '',
    DOB: '',
    Email: '',
    TelNo: '',
    Address: '',
    Password: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
        FName: '',
        LName: '',
        UserName: '',
        NIC: '',
        DOB: '',
        Email: '',
        TelNo: '',
        Address: '',
        Password: '',
    });
    setFormErrors({
        FName: '',
        LName: '',
        UserName: '',
        NIC: '',
        DOB: '',
        Email: '',
        TelNo: '',
        Address: '',
        Password: '',
    });
  };


  const [editingJobSeeker, seteditingJobSeeker] = useState(null);
  const [deletingJobSeeker, setDeletingJobSeeker] = useState(null);
  const [JobSeeker, setJobSeeker] = useState([]); 
  

  useEffect(() => {
    fetchData();
  }, []);


  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/Registration/Jobseeker');
      setJobSeeker(response.data);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      console.log(response.data);
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'job_Seeker_Id', title: 'JobSeeker Id' },
          { data: 'userName', title: 'User Name' },
          { data: 'email', title: 'Email' },
          { data: 'telNo', title: 'Tel Number' },
          { data: 'address', title: 'Address' },
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
      console.error('Error fetching JobSeeker list', error);
    }
  };

  const renderActionButtons = (data, type, row) => {
    return (
      '<center>' +
      '<button type="button" class="btn btn-success btn-sm" onclick="window.handleEdit(' +
      row.job_Seeker_Id + ', \'' + row.fName + '\', \'' + row.lName +'\', \'' + row.nic +'\', \'' + row.email +'\', \'' + row.dob +'\', \'' + row.telNo +'\', \'' + row.address +'\')"><i class="bi bi-pencil-square"></i> Edit</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleDelete(' +
      row.job_Seeker_Id +
      ')">Delete</button>' +
      '</center>'
    );
  };

  window.handleEdit = (Job_Seeker_Id, fName, lName, nic, email, dob, telNo, address) => {
    seteditingJobSeeker(Job_Seeker_Id);
    console.log(dob);
    setFormData({
        FName: fName,
        LName: lName,
        NIC: nic,
        Email: email,
        DOB: dob,
        TelNo: telNo,
        Address: address,
    });
    handleShowModal();
};

window.handleDelete = (Job_Seeker_Id) => {
    setDeletingJobSeeker(Job_Seeker_Id);
    handleShowDeleteModal();
  };

  const handleDeleteJobSeeker = async () => {
    try {
    await axios.delete(`https://localhost:7103/api/Registration/JobSeeker/${deletingJobSeeker}`);
    console.log('Country deleted successfully');
    handleCloseDeleteModal();
    window.location.reload();
    } catch (error) {
    console.error('Error deleting country', error);
    }
};

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'FName' || name === 'LName') {
      const firstName = formData.FName || '';
      const lastName = formData.LName || '';
      const userName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
      
      setFormData({
        ...formData,
        UserName: userName,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  


  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAddUser = async () => {
    try {

      const errors = {};
      if (!formData.FName) {
        errors.FName = 'First name is required.';
      }
      if (!formData.LName) {
        errors.LName = 'Last name is required.';
      }
      if (!formData.Email) {
        errors.Email = 'Email is required.';
      }else if (!isValidEmail(formData.Email)) {
        errors.Email = 'Please enter a valid email address.';
      }
      if (!formData.TelNo) {
        errors.TelNo = 'Contact number is required.';
      }
      if (!formData.Password && !editingJobSeeker) {
        errors.Password = 'Password is required.';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        Swal.fire({title: 'Warning', text: 'Something went wrong..!', icon: 'error' }).then((result) => {
          if (result.isConfirmed) {
            window.scrollTo({top: 0,behavior: 'smooth'});
          }
        });
        return;
      }

      if (editingJobSeeker) {
        await axios.put(`https://localhost:7103/api/Registration/JobSeeker/${editingJobSeeker}`, formData);
      } else {
        await axios.post('https://localhost:7103/api/Registration/registration', formData);
      }
      Swal.fire({title: 'Success', text: '', icon: 'success' }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          window.scrollTo({top: 0,behavior: 'smooth'});
        }
      });
      handleCloseModal();
    } catch (error) {
      Swal.fire({title: 'Warning', text: 'Something went wrong..!', icon: 'error' }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          window.scrollTo({top: 0,behavior: 'smooth'});
        }
      });
    }
  };


  return(
    <div>
      <Navbar />
      <br></br>
        <br></br>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>All JobSeeker List</h4>
            <Button variant="primary" size="sm" onClick={handleShowModal}>
            <i class="bi bi-person-add"></i> Add Job Seeker
            </Button>
            <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-danger btn-sm" table="tableId" filename="JobSeeker_report" sheet="report" buttonText="Download Report"/>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Address</th>
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
          <Modal.Title>{editingJobSeeker ? 'Edit JobSeeker' : 'Add JobSeeker'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="mb-3">
              <label htmlFor="FName" className="form-label">
                First Name
              </label>
              <input type="text" className={`form-control ${formErrors.FName ? 'is-invalid' : ''}`} id="FName" name="FName" placeholder="" value={formData.FName} onChange={handleInputChange}/>
              {formErrors.FName && <div className="invalid-feedback">{formErrors.FName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="LName" className="form-label">
                Last Name
              </label>
              <input type="text" className={`form-control ${formErrors.LName ? 'is-invalid' : ''}`} id="LName" name="LName" placeholder="" value={formData.LName} onChange={handleInputChange}/>
              {formErrors.LName && <div className="invalid-feedback">{formErrors.LName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="NIC" className="form-label">
                NIC
              </label>
              <input type="text" className={`form-control ${formErrors.NIC ? 'is-invalid' : ''}`} id="NIC" name="NIC" placeholder="" value={formData.NIC} onChange={handleInputChange}/>
              {formErrors.NIC && <div className="invalid-feedback">{formErrors.NIC}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" placeholder="" value={formData.Email} onChange={handleInputChange}/>
              {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="DOB" className="form-label">
                Date of Birth
              </label>
              <input type="date" className={`form-control ${formErrors.DOB ? 'is-invalid' : ''}`} id="DOB" name="DOB" placeholder="" value={formData.DOB} onChange={handleInputChange}/>
              {formErrors.DOB && <div className="invalid-feedback">{formErrors.DOB}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="TelNo" className="form-label">
                Contact Number
              </label>
              <input type="number" className={`form-control ${formErrors.TelNo ? 'is-invalid' : ''}`} id="TelNo" name="TelNo" placeholder="" value={formData.TelNo} onChange={handleInputChange}/>
              {formErrors.TelNo && <div className="invalid-feedback">{formErrors.TelNo}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input type="text" className={`form-control ${formErrors.Address ? 'is-invalid' : ''}`} id="Address" name="Address" placeholder="" value={formData.Address} onChange={handleInputChange}/>
              {formErrors.Address && <div className="invalid-feedback">{formErrors.Address}</div>}
            </div>

          {!editingJobSeeker ?
          <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input type="password" className={`form-control ${formErrors.Password ? 'is-invalid' : ''}`} id="Password" name="Password" placeholder="" value={formData.Password} onChange={handleInputChange}/>
              {formErrors.Password && <div className="invalid-feedback">{formErrors.Password}</div>}
            </div> : ''}

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddUser}>
            {editingJobSeeker ? 'Save Changes' : 'Add JobSeeker'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this JobSeeker?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteJobSeeker}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default JobSeeker;
