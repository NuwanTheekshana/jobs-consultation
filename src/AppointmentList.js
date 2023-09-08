import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';
import Swal from 'sweetalert2';

function AppointmentList() {

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
                <img src="../assets/img/hero-bg.jpeg" alt="" data-aos="fade-in" />

                <div className="container">
                    <div className="row">
                        <center>
                        <div className="col-lg-10">
                        <h2 data-aos="fade-up" className="text-warning font-weight-bold" data-aos-delay="100">Your Appointment List</h2>
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
                        <h5 className="card-title mb-5"><b><i class="bi bi-file-earmark-person-fill"></i> Consaltation Appointment List</b></h5>
                       
                    <div class="table-responsive">
                        <table className="table table-lg">
                        <thead>
                            <tr>
                            <th scope="col">Job Request Id</th>
                            <th scope="col">Consultant Name</th>
                            <th scope="col">Job Category</th>
                            <th scope="col">Country</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time Slot</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">3</th>
                            <td>Namal Perera</td>
                            <td>Software Engineer</td>
                            <td>Australia</td>
                            <td>2022-09-15</td>
                            <td>09:00:00 - 11:00:00</td>
                            <td>
                            <button type="button" className="btn btn-danger">Pending</button>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                            <td>Kasun Sadaruwan</td>
                            <td>Data Science</td>
                            <td>New Zealand</td>
                            <td>2022-09-16</td>
                            <td>16:00:00 - 18:00:00</td>
                            <td>
                                <button type="button" className="btn btn-success">Accepted</button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                    </div>
                </div>
                </div>


                   

                

            
 
		        <Footer />
        </div>
  );
}

export default AppointmentList;
