import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';


function About() {
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
                        <h2 data-aos="fade-up" data-aos-delay="100">About Us</h2>
                        <p data-aos="fade-up" data-aos-delay="200">Unlocking Your Career Potential: Meet Our Expert Job Consultation Team</p>
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


    

            </div>




		<Footer />
        </div>
  );
}

export default About;
