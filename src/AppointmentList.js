import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';
import Swal from 'sweetalert2';
import axios from 'axios';

function AppointmentList() {

const Userid = localStorage.getItem("id");
const UserName = localStorage.getItem("UserName");
const Email = localStorage.getItem("Email");

const [AppointmentList, setAppointmentList] = useState([]);

useEffect(() => {
  fetchData();
}, []);



const fetchData = async () => {
  try {
    const errors = {};
    const response = await axios.get(`https://localhost:7103/api/JobRequest/JobRequest/GetJobSeekerRequest/${Userid}`);
    setAppointmentList(response.data);
    console.log(response.data);

  } catch (error) {
    console.error('Data fatch failed', error);
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
                            <th scope="col">JobSeeker Name</th>
                            <th scope="col">Request Date</th>
                            <th scope="col">Time Slot</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {AppointmentList.map((Appointments) => (
                          <tr key={Appointments.jobseekerRequestId}>
                            <td>{Appointments.jobseekerRequestId}</td>
                            <td>{Appointments.consultantUserName}</td>
                            <td>{Appointments.jobSeekerUserName}</td>
                            <td>{Appointments.request_date}</td>
                            <td>{Appointments.time_slot}</td>
                            <td>
                              {Appointments.job_Status === "Pending" ? (
                                <button type="button" className="btn btn-warning">{Appointments.job_Status}</button>
                              ) : Appointments.job_Status === "Accepted" ? (
                                <button type="button" className="btn btn-success">{Appointments.job_Status}</button>
                              ) : Appointments.job_Status === "Rejected" ? (
                                <button type="button" className="btn btn-danger">{Appointments.job_Status}</button>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
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
