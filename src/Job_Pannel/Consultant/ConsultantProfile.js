import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

function ConsultantProfile() {
  const consid = localStorage.getItem("id");
  const [profile, setProfile] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [ConsId, setConsId] = useState('');
  const [formErrors, setFormErrors] = useState({
    attachment: null,
    description: null,
    cons_id: null,
  });

  const [formData, setFormData] = useState({
    attachment: null,
    description: '', 
    cons_id: '',
  });
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (profile.image_Path) {
      setSelectedFile(profile.image_Path);
    }
    if (profile.cons_Id) {
        setConsId(profile.cons_Id);
      }
    if (profile.description) {
        setDescription(profile.description);
      }
  }, [profile]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7103/api/Consultant/Consultant/ConsultantProfile/${consid}`);
      setProfile(response.data[0]);
      if (response.data[0].cons_Id) {
        setFormData({
          ...formData,
          cons_id: response.data[0].cons_Id,
          description: response.data[0].description,
        });
      }
    } catch (error) {
      console.error('Consultant data retrieval failed..!', error);
    }
  };

  const handleFileInputChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "attachment") {
      if (files && files.length > 0) {
        const file = files[0];
        setFormData({
          ...formData,
          [name]: file,
        });
      }
    } else if (name === "description") {
      setDescription(value);
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const errors = {};

      if (!formData.description) {
        errors.description = 'Description is required.';
      }
      if (!formData.attachment) {
        errors.attachment = 'Attachement is required.';
      }
      if (!formData.cons_id) {
        errors.cons_id = 'Something want wrong. Please check your login.';
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
      
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.put('https://localhost:7103/api/Consultant/Consultant/ConsultantProfile', formDataToSend);
      Swal.fire({title: 'Success', text: response.data.statusMessage, icon: 'success' }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
          window.scrollTo({top: 0,behavior: 'smooth'});
        }
      });
    } catch (error) {
      console.error('File upload failed..!', error);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Consultant Profile</h4>
          </div>
          <div className="card-body">
            <div className="row justify-content-center mb-5">
            <div className="col-md-6 offset-md-3">
              {/* <img
                src={`https://localhost:7103/${selectedFile || "../assets/img/nonimg.webp"}`}
                alt="Circular Image"
                className="img-fluid rounded-circle"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              /> */}
              {selectedFile == null ? (
                  <img
                  src="../assets/img/nonimg.webp"
                  alt="Circular Image"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                ): 
                <img
                  src={`https://localhost:7103/${selectedFile}`}
                  alt="Circular Image"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                
                }
              
            </div>

            </div>
            <div className="row">
              <form>
                <div className="row mb-3">
                  <label htmlFor="name" className="col-sm-4 col-form-label h5">Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control form-control-lg" id="name" name="name" value={profile.username || ''}disabled/>
                    <input type="hidden" className="form-control form-control-lg" id="cons_id" name="cons_id" value={formData.cons_id} readOnly />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="email" className="col-sm-4 col-form-label h5">Email</label>
                  <div className="col-sm-8">
                    <input type="email" className="form-control form-control-lg" id="email" name="email" value={profile.email || ''} disabled />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="attachment" className="col-sm-4 col-form-label h5">Profile Picture <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <input type="file" className={`form-control form-control-lg ${formErrors.attachment ? 'is-invalid' : ''}`} id="attachment" name="attachment" accept=".jpg, .jpeg, .png, .gif" onChange={handleFileInputChange} />
                    {formErrors.attachment && <div className="invalid-feedback">{formErrors.attachment}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                <label htmlFor="description" className="col-sm-4 col-form-label h5">Description <span className="text-danger">*</span></label>
                <div className="col-sm-8">
                <textarea className={`form-control form-control-lg ${formErrors.description ? 'is-invalid' : ''}`} id="description" rows="3" name="description" value={description} onChange={handleFileInputChange}></textarea>
                  {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
                </div>
              </div>
                <center>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}><i className="bi bi-person-lines-fill"></i> Update Profile</button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultantProfile;
