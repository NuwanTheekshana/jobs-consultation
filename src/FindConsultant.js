import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';
import Swal from 'sweetalert2';
import axios from 'axios';

function FindConsultant() {

  const [ConsultantList, setConsultantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  
  
  const fetchData = async () => {
    try {
      const errors = {};
      const response = await axios.get(`https://localhost:7103/api/Consultant/Consultant`);
      setConsultantList(response.data);
      console.log(response.data);
  
    } catch (error) {
      console.error('Data fatch failed', error);
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

                
    <section id="team" className="team">
      <div className="container section-title" data-aos="fade-up">
        <h2>Consultant Team</h2>
        <p>Expertise. Collaboration. Results.</p>
      </div>

      <div className="container">

        <div className="row gy-5">

        

        {ConsultantList.map((ConsultantLists) => (
               <div className="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="100">
               <div className="member-img">
                 {/* <img src={`https://localhost:7103/${ConsultantLists.image_Path} || "../assets/img/nonimg.webp"`} className="img-fluid" alt="" />
                 <img src={`https://localhost:7103/${ConsultantLists.image_Path} || "../assets/img/nonimg.webp"`} className="img-fluid" alt="" /> */}
                {ConsultantLists.image_Path == "" ? (
                  <img src="../assets/img/nonimg.webp" className="img-fluid" alt="" />
                ): 
                <img src={`https://localhost:7103/${ConsultantLists.image_Path}`} className="img-fluid" alt="" />
                }
               </div>
               <div className="member-info text-center">
                 <h4>{ConsultantLists.userName}</h4>
                 <span>{ConsultantLists.job_Category}</span>
                 <span>{ConsultantLists.country}</span>
                 <p>{ConsultantLists.description}</p>
               </div>
             </div>         
        ))}

         

        

        </div>

      </div>

    </section>

                   

                

            
 
		        <Footer />
        </div>
  );
}

export default FindConsultant;
