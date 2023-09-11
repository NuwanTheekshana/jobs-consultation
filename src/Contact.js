import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';


function Contact() {
    const Permission = localStorage.getItem("Permission");
    const targetDivRef = useRef(null);
    const scrollToDiv = () => {
        if (targetDivRef.current) {
        targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


  return (
    <div>
            <Header />
            
            <div>
                <section id="hero" className="hero">
                <img src="assets/img/hero-bg.jpeg" alt="" data-aos="fade-in" />

                <div className="container">
                    <div className="row">
                    <div className="col-lg-10">
                        <h2 data-aos="fade-up" data-aos-delay="100">Contact Us</h2>
                        <p data-aos="fade-up" data-aos-delay="200">Unlocking Your Career Potential: Meet Our Expert Job Consultation Team</p>
                    </div>

                       

                    </div>
                </div>

                </section>


                <section id="contact" className="contact">

                    <div className="container section-title" data-aos="fade-up">
                    <h2>Contact</h2>
                    <p>Call to contact us to inquire about our services</p>
                    </div>

                    <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-4">

                        <div className="col-lg-6">

                        <div className="row gy-4">
                            <div className="col-md-6">
                            <div className="info-item" data-aos="fade" data-aos-delay="200">
                                <i className="bi bi-geo-alt"></i>
                                <h3>Address</h3>
                                <p>No : 35</p>
                                <p>Slave Island, Colombo 03</p>
                            </div>
                            </div>

                            <div className="col-md-6">
                            <div className="info-item" data-aos="fade" data-aos-delay="300">
                                <i className="bi bi-telephone"></i>
                                <h3>Call Us</h3>
                                <p>011 425 1587</p>
                                <p>077 025 0125</p>
                            </div>
                            </div>

                            <div className="col-md-6">
                            <div className="info-item" data-aos="fade" data-aos-delay="400">
                                <i className="bi bi-envelope"></i>
                                <h3>Email Us</h3>
                                <p>JobsCons@jobs.com</p>
                                <p>contact@jobs.com</p>
                            </div>
                            </div>

                            <div className="col-md-6">
                            <div className="info-item" data-aos="fade" data-aos-delay="500">
                                <i className="bi bi-clock"></i>
                                <h3>Open Hours</h3>
                                <p>Monday - Friday</p>
                                <p>08:00AM - 05:00PM</p>
                            </div>
                            </div>

                        </div>

                        </div>

                        <div className="col-lg-6">
                        <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                            <div className="row gy-4">

                            <div className="col-md-6">
                                <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                            </div>

                            <div className="col-md-6 ">
                                <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                            </div>

                            <div className="col-md-12">
                                <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                            </div>

                            <div className="col-md-12">
                                <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                            </div>

                            <div className="col-md-12 text-center">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your message has been sent. Thank you!</div>

                                <button type="submit">Send Message</button>
                            </div>

                            </div>
                        </form>
                        </div>

                    </div>

                    </div>

                    </section>


    

            </div>




		<Footer />
        </div>
  );
}

export default Contact;
