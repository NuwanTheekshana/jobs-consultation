import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';
import Swal from 'sweetalert2';

function ConsultantRequst() {

const UserName = localStorage.getItem("UserName");
const Email = localStorage.getItem("Email");
const [formData, setFormData] = useState({
    country : '',
    consultant : '',
    consultantAvailability : '',
  });
const [formErrors, setFormErrors] = useState({
    country : '',
    consultant : '',
    consultantAvailability : '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleRequest = async () => {
    try {
      const errors = {};
      if (!formData.country) {
        errors.country = 'Country is required.';
      }
      if (!formData.consultant) {
        errors.consultant = 'Consultant is required.';
      }
      if (!formData.consultantAvailability) {
        errors.consultantAvailability = 'Consultant avaiability is required.';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        Swal.fire({icon: 'error',
                  title: 'Oops...',   
                  text: 'Something went wrong!'});
        return;
      }

      Swal.fire('Success', 'Request send successfully..!', 'success');
      } catch (error) {
        console.error('User added failed', error);
      }

  };



const showAlert = () => {
        Swal.fire({icon: 'error',
                  title: 'Oops...',   
                  text: 'Something went wrong!'});
    }



  return (
    <div>
            <Header />
            
            <section id="hero" className="hero">
                <img src="../assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />

                <div className="container">
                    <div className="row">
                        <center>
                        <div className="col-lg-10">
                        <h2 data-aos="fade-up" className="text-warning font-weight-bold" data-aos-delay="100">Send Consultant Request</h2>
                        <p data-aos="fade-up" data-aos-delay="200">Unlocking Your Career Potential: Meet Our Expert Job Consultation Team</p>
                    </div>
                        </center>

                        {/* <div className="col-lg-5 mt-2" data-aos="fade-up" data-aos-delay="300">
                            <button className='btn btn-danger btn-block' type='button'> <i className="bi bi-send"></i> Consultation Request</button>
                        </div>
                   */}

                    </div>
                </div>

                </section>

                <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-5"><b><i className="bi bi-airplane-engines-fill"></i> Consaltation Request Form</b></h5>
                        <form>
                        <div className="row mb-3">
                            <label htmlFor="Username" className="col-sm-2 col-form-label h5">Your Name <span className="text-danger">*</span></label>
                            <div className="col-sm-10">
                            <input type="text" className={`form-control form-control-lg ${formErrors.Username ? 'is-invalid' : ''}`} id="Username" value={UserName} disabled />
                            {formErrors.Username && <div className="invalid-feedback">{formErrors.Username}</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="Email" className="col-sm-2 col-form-label h5">Email <span className="text-danger">*</span></label>
                            <div className="col-sm-10">
                            <input type="email" className="form-control form-control-lg" id="Email" value={Email} disabled />
                            {formErrors.Username && <div className="invalid-feedback">{formErrors.Username}</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="Description" className="col-sm-2 col-form-label h5">Description</label>
                            <div className="col-sm-10">
                            <textarea className="form-control form-control-lg" id="Description" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="attachment" className="col-sm-2 col-form-label h5">Attachment</label>
                            <div className="col-sm-10">
                            <input type="file" className="form-control form-control-lg" id="attachment" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="country" className="col-sm-2 col-form-label h5">Required Country <span className="text-danger">*</span></label>
                            <div className="col-sm-10">
                            <select className={`form-control form-control-lg ${formErrors.country ? 'is-invalid' : ''}`} id="country" name="country" onChange={handleInputChange}>
                            <option>Select Country</option>
                            <option>Sri Lanka</option>
                            <option>India</option>
                            <option>Australia</option>
                            <option>New Zealand</option>
                            <option>Canada</option>
                            <option>Pakistan</option>
                            </select>
                            {formErrors.country && <div className="invalid-feedback">{formErrors.country}</div>}
                            </div>
                            
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="consultant" className="col-sm-2 col-form-label h5">Consultant List <span className="text-danger">*</span></label>
                            <div className="col-sm-10">
                            <select className={`form-control form-control-lg ${formErrors.consultant ? 'is-invalid' : ''}`} id="consultant" name="consultant" onChange={handleInputChange}>
                            <option>Select Consultant</option>
                            <option>Namal Perera</option>
                            </select>
                            {formErrors.consultant && <div className="invalid-feedback">{formErrors.consultant}</div>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="consultantAvailability" className="col-sm-2 col-form-label h5">Consultant Availablity <span className="text-danger">*</span></label>
                            <div className="col-sm-10">
                            <select className={`form-control form-control-lg ${formErrors.consultantAvailability ? 'is-invalid' : ''}`} id="consultantAvailability" name="consultantAvailability" onChange={handleInputChange}>
                            <option>Select Available Time</option>
                            <option>08:00 - 10:00</option>
                            <option>12:00 - 14:00</option>
                            <option>16:00 - 18:00</option>
                            </select>
                            {formErrors.consultantAvailability && <div className="invalid-feedback">{formErrors.consultantAvailability}</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="remarks" className="col-sm-2 col-form-label h5">Remarks</label>
                            <div className="col-sm-10">
                            <textarea className="form-control form-control-lg" id="remarks" rows="3"></textarea>
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

export default ConsultantRequst;
