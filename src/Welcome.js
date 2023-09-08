import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';

function Welcome() {
  return (
    <div>
            <Header />
            
            <div>
                <section id="hero" className="hero">
                <img src="assets/img/hero-bg.jpeg" alt="" data-aos="fade-in" />

                <div className="container">
                    <div className="row">
                    <div className="col-lg-10">
                        <h2 data-aos="fade-up" data-aos-delay="100">Welcome to Job Consultation Service</h2>
                        <p data-aos="fade-up" data-aos-delay="200">Unlocking Your Career Potential: Meet Our Expert Job Consultation Team</p>
                    </div>

                        <div className="col-lg-5 mt-2" data-aos="fade-up" data-aos-delay="300">
                            <button className='btn btn-danger btn-block' type='button'> <i className="bi bi-send"></i> Consultation Request</button>
                        </div>

                    </div>
                </div>

                </section>


        <section id="about" className="about">

                <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row align-items-xl-center gy-5">

                    <div className="col-xl-5 content">
                    <h3>About Us</h3>
                    <h2>Welcome to Jobs Consultation Services</h2>
                    <p>Your trusted source for expert guidance and consultation services in Colombo. We are committed to providing invaluable support and solutions to individuals, families, and businesses, helping them navigate life's challenges and make informed decisions.</p>
                    <a href="#" className="read-more custome"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                    </div>

                    <div className="col-xl-7">
                    <div className="row gy-4 icon-boxes">

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div className="icon-box">
                            <i className="bi bi-buildings"></i>
                            <h3>Experienced Professionals</h3>
                            <p>Our team consists of highly qualified and experienced consultants who specialize in various fields, ensuring that you receive the best guidance and insights.</p>
                        </div>
                        </div> 

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <div className="icon-box">
                            <i className="bi bi-clipboard-pulse"></i>
                            <h3>Personalized Solutions</h3>
                            <p>We understand that every situation is unique. That's why we take the time to listen and customize our services to meet your specific needs.</p>
                        </div>
                        </div> 

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                        <div className="icon-box">
                            <i className="bi bi-command"></i>
                            <h3>Confidentiality</h3>
                            <p>Your privacy is of utmost importance to us. We maintain strict confidentiality to create a safe and secure environment for our clients.</p>
                        </div>
                        </div>

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                        <div className="icon-box">
                            <i className="bi bi-graph-up-arrow"></i>
                            <h3>Comprehensive Services</h3>
                            <p>Whether you need personal counseling, family guidance, or business consultation, we offer a wide range of services to address diverse challenges.</p>
                        </div>
                        </div>

                    </div>
                    </div>

                </div>
                </div>

        </section>


        
        <section id="call-to-action" className="call-to-action">

        <img src="assets/img/cta-bg.jpg" alt="" />

            <div className="container">
            <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                <div className="col-xl-10">
                <div className="text-center">
                    <h3>Call To Action</h3>
                    <p>We are conveniently located in the heart of Colombo, and our dedicated team is here to assist you. Feel free to get in touch with us to schedule an appointment or inquire about our services.</p>
                    <a className="cta-btn custome" href="#">Call To Action</a>
                </div>
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

export default Welcome;
