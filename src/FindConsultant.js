import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';
import Swal from 'sweetalert2';

function FindConsultant() {

  return (
    <div>
            <Header />
            
            <section id="hero" className="hero">
                <img src="../assets/img/hero-bg.jpeg" alt="" data-aos="fade-in" />

                <div className="container">
                    <div className="row">
                        <center>
                        <div className="col-lg-10">
                        <h2 data-aos="fade-up" className="text-warning font-weight-bold" data-aos-delay="100">Find Your Consultants</h2>
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
                        {/* <h5 className="card-title mb-5"><b><i class="bi bi-file-earmark-person-fill"></i> Consaltation Appointment List</b></h5>
                        */}
                        <div class="container">
                        <h2>Consaltant List</h2>
                        <input type="text" id="searchInput" class="form-control mb-3 form-control-lg" placeholder="Search" />
                        <table class="table table-bordered table-striped table-lg">
                            <thead>
                            <tr>
                            <th scope="col">Consultant Name</th>
                            <th scope="col">Job Category</th>
                            <th scope="col">Country</th>
                            <th scope="col">Status</th>
                            </tr>
                            </thead>
                            <tbody id="tableBody">

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

export default FindConsultant;
