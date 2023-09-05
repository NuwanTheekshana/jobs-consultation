import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery

function Country() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    Country_Code: '',
    Country_Name: '',
  });
  const [formErrors, setFormErrors] = useState({
    Country_Code: '',
    Country_Name: '',
  });

  const [countryList, setCountryList] = useState([]);
  const [editingCountry, setEditingCountry] = useState(null);
  const [deletingCountry, setDeletingCountry] = useState(null);

  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/Country/countries');
      setCountryList(response.data);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'country_Id' },
          { data: 'country_Code', title: 'Country Code' },
          { data: 'country_Name', title: 'Country Name' },
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
      row.country_Id + ', \'' + row.country_Code + '\', \'' + row.country_Name +
      '\')"><i class="bi bi-pencil-square"></i> Edit</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleDelete(' +
      row.country_Id +
      ')">Delete</button>' +
      '</center>'
    );
  };
  

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      Country_Code: '',
      Country_Name: '',
    });
    setFormErrors({
      Country_Code: '',
      Country_Name: '',
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

  const handleAddCountry = async () => {
  try {
    const errors = {};
    if (!formData.Country_Code) {
      errors.Country_Code = 'Country Code is required.';
    }
    if (!formData.Country_Name) {
      errors.Country_Name = 'Country Name is required.';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    if (editingCountry) {
      await axios.put(`https://localhost:7103/api/Country/country/${editingCountry}`, formData);
    } else {
      await axios.post('https://localhost:7103/api/country/country', formData);
    }
    console.log('Country added/updated successfully');
    handleCloseModal();
    window.location.reload();
  } catch (error) {
    console.error('Error adding/updating country', error);
  }
}

window.handleEdit = (jobtype, country_Code, country_Name) => {
    setEditingCountry(jobtype);
    setFormData({
        Country_Code: country_Code,
        Country_Name: country_Name,
    });
    handleShowModal();
};

window.handleDelete = (country) => {
    setDeletingCountry(country);
    handleShowDeleteModal();
  };


const handleDeleteCountry = async () => {
    try {
    await axios.delete(`https://localhost:7103/api/Country/country/${deletingCountry}`);
    console.log('Country deleted successfully');
    handleCloseDeleteModal();
    window.location.reload();
    } catch (error) {
    console.error('Error deleting country', error);
    }
};

  

  return (
    <div>
      <Navbar />
      <br />
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Country List</h4>
            <Button variant="danger" size="sm" onClick={handleShowModal}>
              Add Country
            </Button>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Country Id</th>
                  <th>Country Code</th>
                  <th>Country Name</th>
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
          <Modal.Title>{editingCountry ? 'Edit Country' : 'Add Country'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="Country_Code" className="form-label">Country Code</label>
              <input
                type="text" className={`form-control ${formErrors.Country_Code ? 'is-invalid' : ''}`} id="Country_Code" name="Country_Code" placeholder="" value={formData.Country_Code} onChange={handleInputChange}/>
              {formErrors.Country_Code && (<div className="invalid-feedback">{formErrors.Country_Code}</div>)}
            </div>
            <div className="mb-3">
              <label htmlFor="Country_Name" className="form-label">
                Country Name
              </label>
              <input type="text" className={`form-control ${formErrors.Country_Name ? 'is-invalid' : ''}`} id="Country_Name" name="Country_Name" placeholder="" value={formData.Country_Name} onChange={handleInputChange}             />
              {formErrors.Country_Name && (<div className="invalid-feedback">{formErrors.Country_Name}</div>)}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddCountry}>
            {editingCountry ? 'Save changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this country?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteCountry}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Country;
