import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';
import Swal from 'sweetalert2';
import axios from 'axios';

function ConsultantRequest() {
  const navigate = useNavigate();
  const jobseekerId = localStorage.getItem("id");
  const UserName = localStorage.getItem("UserName");
  const Email = localStorage.getItem("Email");
  const [formData, setFormData] = useState({
    country: '',
    Job_Category: '',
    consultant: '',
    consultantAvailability: '',
    request_date: '',
    Remarks: '', 
    Description: '', 
    attachment: null,
    jobseekerId: jobseekerId,
  });

  const [formErrors, setFormErrors] = useState({
    country: '',
    Job_Category: '',
    consultant: '',
    consultantAvailability: '',
    request_date: '',
    Remarks: '',
    Description: '',
    attachment: null,
    jobseekerId: jobseekerId,
  });

  const [countries, setCountries] = useState([]);
  const [JobCategories, setJobCategories] = useState([]);
  const [Consultant, setConsultant] = useState([]);
  const [JobCategoryId, setJobCategoryId] = useState('');
  const [CountryId, setCountryId] = useState('');
  const [ConsTime, setConsTime] = useState([]);
  const [RequestDate, setRequestDate] = useState('');

  useEffect(() => {
    handleJobCategoryList();
    handleCountryList();
  }, []);

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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    if (name === "request_date") {
      setRequestDate(value);
    }
    if (name === "Job_Category") {
      setJobCategoryId(value);
    }
    if (name === "country") {
      setCountryId(value);
      handleConsultantList(JobCategoryId, value);
    }
    if (name === "consultant") {
      handleTimeList(value);
    }
  };
  

  const handleRequest = async () => {
    try {
      console.log(formData);
      const errors = {};
      if (!formData.country) {
        errors.country = 'Country is required.';
      }
      if (!formData.Job_Category) {
        errors.Job_Category = 'Job category is required.';
      }
      if (!formData.consultant) {
        errors.consultant = 'Consultant is required.';
      }
      if (!formData.request_date) {
        errors.request_date = 'Requested date is required.';
      }
      if (!formData.attachment) {
        errors.attachment = 'Attachment is required.';
      }
      if (!formData.consultantAvailability) {
        errors.consultantAvailability = 'Consultant availability is required.';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        return;
      }
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await axios.post('https://localhost:7103/api/JobRequest/JobRequest', formDataToSend);

      Swal.fire('Success', 'Request sent successfully..!', 'success');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      navigate('/appointment/AppointmentList');

    } catch (error) {
      console.error('User request failed', error);
    }
  };

  const handleCountryList = async () => {
    try {
      const response = await axios.get(`https://localhost:7103/api/Country/countries`);
      setCountries(response.data);
    } catch (error) {
      console.error('Country list failed..!', error);
    }
  };

  const handleJobCategoryList = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/JobType/Getjobtype');
      setJobCategories(response.data);
    } catch (error) {
      console.error('Job Category list failed..!', error);
    }
  };

  const handleConsultantList = async (job_id, country_id) => {
    try {
      const errors = {};
      const response = await axios.get(`https://localhost:7103/api/Consultant/Consultant/${job_id}/${country_id}`);
      if (response.data.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Our services do not provide this..!',
        });
        errors.Job_Category = 'Our services do not provide this.';
        errors.country = 'Consultants are not available.';
        setFormErrors(errors);
      } else {
        setConsultant(response.data);
      }
    } catch (error) {
      console.error('Consultant list failed..!', error);
    }
  };

  const handleTimeList = async (cons_id) => {
    try {
      const response = await axios.get(`https://localhost:7103/api/ConsultantTime/GetConsultantAvailbleTime/${cons_id}/${RequestDate}`);
      setConsTime(response.data);
    } catch (error) {
      console.error('Consultant time list failed..!', error);
    }
  };

  return (
    <div>
      <Header />
   
      <section id="hero" className="hero">
        <img src="../assets/img/hero-bg.jpeg" alt="" data-aos="fade-in" />

        <div className="container">
          <div className="row">
            <center>
              <div className="col-lg-10">
                <h2 data-aos="fade-up" className="text-warning font-weight-bold" data-aos-delay="100">Send Consultant Request</h2>
                <p data-aos="fade-up" data-aos-delay="200">Unlocking Your Career Potential: Meet Our Expert Job Consultation Team</p>
              </div>
            </center>
          </div>
        </div>
      </section>

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-5"><b><i className="bi bi-airplane-engines-fill"></i> Consultation Request Form</b></h5>
              <form>
                <div className="row mb-3">
                  <label htmlFor="Username" className="col-sm-4 col-form-label h5">Your Name <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <input type="text" className={`form-control form-control-lg ${formErrors.Username ? 'is-invalid' : ''}`} id="Username" value={UserName} disabled />
                    <input type="hidden" className={`form-control form-control-lg ${formErrors.jobseekerId ? 'is-invalid' : ''}`} id="jobseekerId" value={jobseekerId} readOnly />
                    {/* {formErrors.jobseekerId && <div className="invalid-feedback">{formErrors.jobseekerId}</div>} */}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Email" className="col-sm-4 col-form-label h5">Email <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <input type="email" className="form-control form-control-lg" id="Email" value={Email} disabled />
                    {formErrors.Username && <div className="invalid-feedback">{formErrors.Username}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Description" className="col-sm-4 col-form-label h5">Description</label>
                  <div className="col-sm-8">
                  <textarea className="form-control form-control-lg" id="Description" rows="3" name="Description" onChange={handleFileInputChange}></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="attachment" className="col-sm-4 col-form-label h5">Attachment <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <input type="file" className={`form-control form-control-lg ${formErrors.attachment ? 'is-invalid' : ''}`} id="attachment" name="attachment" accept="application/pdf"  onChange={handleFileInputChange} />
                    {formErrors.attachment && <div className="invalid-feedback">{formErrors.attachment}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="request_date" className="col-sm-4 col-form-label h5">Request Date <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <input type="date" className={`form-control form-control-lg ${formErrors.request_date ? 'is-invalid' : ''}`} id="request_date" name="request_date" onChange={handleFileInputChange} />
                    {formErrors.request_date && <div className="invalid-feedback">{formErrors.request_date}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="Job_Category" className="col-sm-4 col-form-label h5">Job Categories <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <select className={`form-control form-control-lg ${formErrors.Job_Category ? 'is-invalid' : ''}`} id="Job_Category" name="Job_Category" onChange={handleFileInputChange}>
                      <option value="">Select Job Category</option>
                      {JobCategories.map((JobCategory) => (
                        <option key={JobCategory.spec_Id} value={JobCategory.spec_Id}>
                          {JobCategory.spec_Name}
                        </option>
                      ))}
                    </select>
                    {formErrors.Job_Category && <div className="invalid-feedback">{formErrors.Job_Category}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="country" className="col-sm-4 col-form-label h5">Required Country <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <select className={`form-control form-control-lg ${formErrors.country ? 'is-invalid' : ''}`} id="country" name="country" onChange={handleFileInputChange}>
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.country_Id} value={country.country_Id}>
                          {country.country_Name}
                        </option>
                      ))}
                    </select>
                    {formErrors.country && <div className="invalid-feedback">{formErrors.country}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="consultant" className="col-sm-4 col-form-label h5">Consultant List <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <select className={`form-control form-control-lg ${formErrors.consultant ? 'is-invalid' : ''}`} id="consultant" name="consultant" onChange={handleFileInputChange}>
                      <option>Select Consultant</option>
                      {Consultant.map((consult) => (
                        <option key={consult.cons_Id} value={consult.cons_Id}>
                          {consult.userName}
                        </option>
                      ))}
                    </select>
                    {formErrors.consultant && <div className="invalid-feedback">{formErrors.consultant}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="consultantAvailability" className="col-sm-4 col-form-label h5">Consultant Availability <span className="text-danger">*</span></label>
                  <div className="col-sm-8">
                    <select className={`form-control form-control-lg ${formErrors.consultantAvailability ? 'is-invalid' : ''}`} id="consultantAvailability" name="consultantAvailability" onChange={handleFileInputChange}>
                      <option>Select Available Time</option>
                      {ConsTime.map((ConsTimes) => (
                        <option key={ConsTimes.con_Time_Id} value={ConsTimes.con_Time_Id}>
                          {ConsTimes.time_From} - {ConsTimes.time_To}
                        </option>
                      ))}
                    </select>
                    {formErrors.consultantAvailability && <div className="invalid-feedback">{formErrors.consultantAvailability}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Remarks" className="col-sm-4 col-form-label h5">Remarks</label>
                  <div className="col-sm-8">
                  <textarea className="form-control form-control-lg" id="Remarks" rows="3" name="Remarks" onChange={handleFileInputChange}></textarea>
                  </div>
                </div>

                <div className="text-center">
                  <button type="button" className="btn btn-danger btn-lg" onClick={handleRequest}> <i className="bi bi-send"></i> Request Send</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ConsultantRequest;
