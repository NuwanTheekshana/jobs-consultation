import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import Swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function AllUser() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    FName: '',
    LName: '',
    Email: '',
    Permission: '',
    Password: '',
  });
  const [formErrors, setFormErrors] = useState({
    FName: '',
    LName: '',
    Email: '',
    Permission: '',
    Password: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      FName: '',
      LName: '',
      Email: '',
      Permission: '',
      Password: '',
    });
    setFormErrors({
      FName: '',
      LName: '',
      Email: '',
      Permission: '',
      Password: '',
    });
  };


  const [editingAllUser, seteditingAllUser] = useState(null);
  const [deletingAllUser, setDeletingAllUser] = useState(null);
  const [AllUser, setAllUser] = useState([]); 
  

  useEffect(() => {
    fetchData();
  }, []);


  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/Registration/Users');
      setAllUser(response.data);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      console.log(response.data);
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'user_Id', title: 'User Id' },
          { data: 'userName', title: 'User Name' },
          { data: 'email', title: 'Email' },
          { data: 'permission_Type', title: 'Permission' },
          { data: 'status_Type', title: 'Status' },
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
      console.error('Error fetching All User list', error);
    }
  };

  const renderActionButtons = (data, type, row) => {
    return (
      '<center>' +
      '<button type="button" class="btn btn-success btn-sm" onclick="window.handleEdit(' +
      row.user_Id + ', \'' + row.userName + '\', \'' + row.email +'\', \'' + row.permission +'\', \'' + row.status +'\')"><i class="bi bi-pencil-square"></i> Edit</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleDelete(' +
      row.user_Id +
      ')">Delete</button>' +
      '</center>'
    );
  };

  window.handleEdit = (user_Id, userName, email, permission) => {
    seteditingAllUser(user_Id);
    setFormData({
        Username: userName,
        Email: email,
        Permission: permission,
    });
    handleShowModal();
};

window.handleDelete = (User_Id) => {
    setDeletingAllUser(User_Id);
    handleShowDeleteModal();
  };

  const handleDeleteAllUser = async () => {
    try {
    await axios.delete(`https://localhost:7103/api/Registration/Users/${deletingAllUser}`);
    console.log('User deleted successfully');
    handleCloseDeleteModal();
    window.location.reload();
    } catch (error) {
    console.error('Error deleting user', error);
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


  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAddUser = async () => {
    try {
      const errors = {};

      if (!editingAllUser) 
      {
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
      if (!formData.Permission) {
        errors.Permission = 'Permission is required.';
      }
      if (!formData.Password) {
        errors.Password = 'Password is required.';
      }
    }
    else
    {
      if (!formData.Email) {
        errors.Email = 'Email is required.';
      }else if (!isValidEmail(formData.Email)) {
        errors.Email = 'Please enter a valid email address.';
      }

      if (!formData.Permission) {
        errors.Permission = 'Permission is required.';
      }
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

      if (editingAllUser) {
        await axios.put(`https://localhost:7103/api/Registration/Users/${editingAllUser}`, formData);
      } else {
        await axios.post('https://localhost:7103/api/Registration/Users', formData);
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
            <h4>All User List</h4>
            <Button variant="primary" size="sm" onClick={handleShowModal}>
            <i class="bi bi-person-add"></i> Add Other Users
            </Button>
            <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-danger btn-sm" table="tableId" filename="All_User_report" sheet="report" buttonText="Download Report"/>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Permission</th>
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
          <Modal.Title>{editingAllUser ? 'Edit Users' : 'Add Other Users'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {!editingAllUser ?
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
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" placeholder="" value={formData.Email} onChange={handleInputChange}/>
              {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
            </div>

          
            <div className="mb-3">
              <label htmlFor="Permission" className="form-label">Permission</label>
              <select className={`form-control ${formErrors.Permission ? 'is-invalid' : ''}`}  id="Permission" name="Permission" onChange={handleInputChange} value={formData.Permission}>
              <option value="">Select Job Category</option>
              <option value="1">Admin User</option>
              <option value="4">Reception</option>
              </select>
              {formErrors.Permission && <div className="invalid-feedback">{formErrors.Permission}</div>}
            </div>

          
          <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input type="password" className={`form-control ${formErrors.Password ? 'is-invalid' : ''}`} id="Password" name="Password" placeholder="" value={formData.Password} onChange={handleInputChange}/>
              {formErrors.Password && <div className="invalid-feedback">{formErrors.Password}</div>}
            </div> 
          </form>
          : 
          
          <form>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                User Name
              </label>
              <input type="text" className={`form-control ${formErrors.Username ? 'is-invalid' : ''}`} id="Username" name="Username" placeholder="" value={formData.Username} onChange={handleInputChange} disabled/>
              {formErrors.Username && <div className="invalid-feedback">{formErrors.Username}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" placeholder="" value={formData.Email} onChange={handleInputChange}/>
              {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="Permission" className="form-label">Permission</label>
              <select className={`form-control ${formErrors.Permission ? 'is-invalid' : ''}`}  id="Permission" name="Permission" onChange={handleInputChange} value={formData.Permission}>
              <option value="">Select Job Category</option>
              <option value="1">Admin User</option>
              <option value="2">Consultant User</option>
              <option value="3">Job Seeker</option>
              <option value="4">Reception</option>
              </select>
              {formErrors.Permission && <div className="invalid-feedback">{formErrors.Permission}</div>}
            </div>
          </form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddUser}>
            {editingAllUser ? 'Save Changes' : 'Add User'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this User?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteAllUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AllUser;
