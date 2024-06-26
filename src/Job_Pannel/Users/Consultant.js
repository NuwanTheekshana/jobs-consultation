import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import Swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Consultant() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    FName: '',
    LName: '',
    Email: '',
    Tel_No: '',
    Job_Category: '',
    Country: '',
    Password: '',
    
  });
  const [formErrors, setFormErrors] = useState({
    FName: '',
      LName: '',
      Email: '',
      Tel_No: '',
      Job_Category: '',
      Country: '',
      Password: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      FName: '',
      LName: '',
      Email: '',
      Tel_No: '',
      Job_Category: '',
      Country: '',
      Password: '',
    });
    setFormErrors({
      FName: '',
      LName: '',
      Email: '',
      Tel_No: '',
      Job_Category: '',
      Country: '',
      Password: '',
    });
  };

  const [countries, setCountries] = useState([]);
  const [editingConsultant, seteditingConsultant] = useState(null);
  const [deletingConsultant, setDeletingConsultant] = useState(null);
  const [JobCategories, setJobCategories] = useState([]); 
  const [Consultant, setConsultant] = useState([]); 
  

  useEffect(() => {
    handlecountrylist();
    handlejobcateogorylist();
    fetchData();
  }, []);


  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/Consultant/Consultant');
      setConsultant(response.data);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'cons_Id', title: 'Consultant Id' },
          { data: 'userName', title: 'User Name' },
          { data: 'email', title: 'Email' },
          { data: 'tel_No', title: 'Tel Number' },
          { data: 'job_Category', title: 'Job Category' },
          { data: 'country', title: 'Country' },
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
      console.error('Error fetching consultant list', error);
    }
  };

  const renderActionButtons = (data, type, row) => {
    return (
      '<center>' +
      '<button type="button" class="btn btn-success btn-sm" onclick="window.handleEdit(' +
      row.cons_Id + ', \'' + row.fName + '\', \'' + row.lName +'\', \'' + row.email +'\', \'' + row.tel_No +'\', \'' + row.job_Category_id +'\', \'' + row.country_id +'\')"><i class="bi bi-pencil-square"></i> Edit</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleDelete(' +
      row.cons_Id +
      ')">Delete</button>' +
      '</center>'
    );
  };

  window.handleEdit = (cons_Id, fName, lName, email, tel_No, job_Category_id, country_id) => {
    seteditingConsultant(cons_Id);
    setFormData({
        FName: fName,
        LName: lName,
        Email: email,
        Tel_No: tel_No,
        Job_Category: job_Category_id,
        Country: country_id,
    });
    handleShowModal();
};

window.handleDelete = (cons_Id) => {
    setDeletingConsultant(cons_Id);
    handleShowDeleteModal();
  };

  const handleDeleteConsultant = async () => {
    try {
    await axios.delete(`https://localhost:7103/api/Registration/Consultant/${deletingConsultant}`);
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
      if (!formData.Tel_No) {
        errors.Tel_No = 'Contact number is required.';
      }
      if (!formData.Job_Category) {
        errors.Job_Category = 'Job cateogories is required.';
      }
      if (!formData.Country) {
        errors.Country = 'Country is required.';
      }
      if (!formData.Password && !editingConsultant) {
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

      if (editingConsultant) {
        await axios.put(`https://localhost:7103/api/Registration/consultant/${editingConsultant}`, formData);
      } else {
        await axios.post('https://localhost:7103/api/Registration/consultant', formData);
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

  const handlecountrylist = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/Country/countries');
      setCountries(response.data);
    } catch (error) {
    console.error('Country list failed..!', error);
    }
  };

  const handlejobcateogorylist = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/JobType/Getjobtype');
      setJobCategories(response.data);
    } catch (error) {
    console.error('Job Category list failed..!', error);
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
            <h4>All Consultant List</h4>
            <Button variant="primary" size="sm" onClick={handleShowModal} className="btn float-right">
            <i class="bi bi-person-add"></i> Add Consultant
            </Button>
            <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-danger btn-sm" table="tableId" filename="Consultant_report" sheet="report" buttonText="Download Report"/>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Job Category</th>
                  <th>Country</th>
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
          <Modal.Title>{editingConsultant ? 'Edit Consultant' : 'Add Consultant'}</Modal.Title>
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
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" placeholder="" value={formData.Email} onChange={handleInputChange}/>
              {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Tel_No" className="form-label">
                Contact Number
              </label>
              <input type="number" className={`form-control ${formErrors.Tel_No ? 'is-invalid' : ''}`} id="Tel_No" name="Tel_No" placeholder="" value={formData.Tel_No} onChange={handleInputChange}/>
              {formErrors.Tel_No && <div className="invalid-feedback">{formErrors.Tel_No}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="Job_Category" className="form-label">Job Categories</label>
              <select className={`form-control ${formErrors.Job_Category ? 'is-invalid' : ''}`}  id="Job_Category" name="Job_Category" onChange={handleInputChange} value={formData.Job_Category}>
              <option value="">Select Job Category</option>
                {JobCategories.map((JobCategory) => (
                <option key={JobCategory.spec_Id} value={JobCategory.spec_Id}>
                  {JobCategory.spec_Name}
                </option>
                ))}
              </select>
              {formErrors.Job_Category && <div className="invalid-feedback">{formErrors.Job_Category}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="Country" className="form-label">Country</label>
            <select className={`form-control ${formErrors.Country ? 'is-invalid' : ''}`} id="Country" name="Country" onChange={handleInputChange} value={formData.Country}>
            <option value="">Select a country</option>
              {countries.map((country) => (
              <option key={country.country_Id} value={country.country_Id }>
                {country.country_Name}
              </option>
              ))}
            </select>
            {formErrors.Country && <div className="invalid-feedback">{formErrors.Country}</div>}
          </div>

          {!editingConsultant ?
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
            {editingConsultant ? 'Save Changes' : 'Add Consultant'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this consultant?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteConsultant}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>




{/* 

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Consultant</Modal.Title>
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
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" placeholder="" value={formData.Email} onChange={handleInputChange}/>
              {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Tel_No" className="form-label">
                Contact Number
              </label>
              <input type="number" className={`form-control ${formErrors.Tel_No ? 'is-invalid' : ''}`} id="Tel_No" name="Tel_No" placeholder="" value={formData.Tel_No} onChange={handleInputChange}/>
              {formErrors.Tel_No && <div className="invalid-feedback">{formErrors.Tel_No}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="Job_Category" className="form-label">Job Categories</label>
              <select className={`form-control ${formErrors.Job_Category ? 'is-invalid' : ''}`}  id="Job_Category" name="Job_Category" onChange={handleInputChange}>
              <option value="">Select Job Category</option>
                {JobCategories.map((JobCategory) => (
                <option key={JobCategory.spec_Id} value={JobCategory.spec_Id}>
                  {JobCategory.spec_Name}
                </option>
                ))}
              </select>
              {formErrors.Job_Category && <div className="invalid-feedback">{formErrors.Job_Category}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="Country" className="form-label">Country</label>
            <select className={`form-control ${formErrors.Country ? 'is-invalid' : ''}`} id="Country" name="Country" onChange={handleInputChange}>
            <option value="">Select a country</option>
              {countries.map((country) => (
              <option key={country.country_Id} value={country.country_Id }>
                {country.country_Name}
              </option>
              ))}
            </select>
            {formErrors.Country && <div className="invalid-feedback">{formErrors.Country}</div>}
          </div>

          <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input type="text" className={`form-control ${formErrors.Password ? 'is-invalid' : ''}`} id="Password" name="Password" placeholder="" value={formData.Password} onChange={handleInputChange}/>
              {formErrors.Password && <div className="invalid-feedback">{formErrors.Password}</div>}
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddUser}>
            Add Consultant
          </Button>
        </Modal.Footer>
      </Modal> */}
    


    </div>
  )
}

export default Consultant;
