import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import Header from '../src/Components/header';
import Footer from '../src/Components/footer';

function Home() {
    
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken === null) {
      navigate('/');
    } else {
      setToken(storedToken);
      setUserName(localStorage.getItem("UserName"));
      setEmail(localStorage.getItem("Email"));
    }
  }, [navigate]);

//   const logout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem('token');
//     localStorage.removeItem('id');
//     localStorage.removeItem('UserName');
//     localStorage.removeItem('Email');
//     localStorage.removeItem('Permission');
//     localStorage.removeItem('Status');
//     navigate('/login');
//   }

  return (
    // <div>
    //   Home <br></br>
    //   Welcome {username}
    //   <br></br>
    //   {Email}
    //   <br></br>
    //   <button onClick={logout}>Logout</button>
    // </div>

    <div>
            <Header />
            
            <div>
                <section id="hero" className="hero">
                <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
        
                <div className="container">
                    <div className="row">
                    <div className="col-lg-10">
                        <h2 data-aos="fade-up" data-aos-delay="100">Welcome to Job Consultation Service</h2>
                        <p data-aos="fade-up" data-aos-delay="200">Unlocking Your Career Potential: Meet Our Expert Job Consultation Team</p>
                    </div>

                        <div className="col-lg-5 mt-2" data-aos="fade-up" data-aos-delay="300">
                            <button className='btn btn-danger btn-block' type='button'> <i className="bi bi-send"></i> Consultation Request</button>
                        </div>
                    
                    {/* <div className="col-lg-5">
                        <form action="#" className="sign-up-form d-flex" data-aos="fade-up" data-aos-delay="300">
                        <input type="text" className="form-control" placeholder="Enter email address" />
                        <input type="submit" className="btn btn-primary" value="Sign up" />
                        </form>
                    </div> */}

                    </div>
                </div>

                </section>


        <section id="clients" className="clients">

            <div className="container-fluid" data-aos="fade-up">

            <div className="row gy-4">

                <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="assets/img/clients/client-1.png" className="img-fluid" alt="" />
                </div>

                <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="assets/img/clients/client-2.png" className="img-fluid" alt="" />
                </div>

                <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="assets/img/clients/client-3.png" className="img-fluid" alt="" />
                </div>

                <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="assets/img/clients/client-4.png" className="img-fluid" alt="" />
                </div>

                <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="assets/img/clients/client-5.png" className="img-fluid" alt="" />
                </div>

                <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="assets/img/clients/client-6.png" className="img-fluid" alt="" />
                </div>

            </div>

            </div>

        </section>


        <section id="about" className="about">

                <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row align-items-xl-center gy-5">

                    <div className="col-xl-5 content">
                    <h3>About Us</h3>
                    <h2>Ducimus rerum libero reprehenderit cumque</h2>
                    <p>Ipsa sint sit. Quis ducimus tempore dolores impedit et dolor cumque alias maxime. Enim reiciendis minus et rerum hic non. Dicta quas cum quia maiores iure. Quidem nulla qui assumenda incidunt voluptatem tempora deleniti soluta.</p>
                    <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                    </div>

                    <div className="col-xl-7">
                    <div className="row gy-4 icon-boxes">

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div className="icon-box">
                            <i className="bi bi-buildings"></i>
                            <h3>Eius provident</h3>
                            <p>Magni repellendus vel ullam hic officia accusantium ipsa dolor omnis dolor voluptatem</p>
                        </div>
                        </div> 

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <div className="icon-box">
                            <i className="bi bi-clipboard-pulse"></i>
                            <h3>Rerum aperiam</h3>
                            <p>Autem saepe animi et aut aspernatur culpa facere. Rerum saepe rerum voluptates quia</p>
                        </div>
                        </div> 

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                        <div className="icon-box">
                            <i className="bi bi-command"></i>
                            <h3>Veniam omnis</h3>
                            <p>Omnis perferendis molestias culpa sed. Recusandae quas possimus. Quod consequatur corrupti</p>
                        </div>
                        </div>

                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                        <div className="icon-box">
                            <i className="bi bi-graph-up-arrow"></i>
                            <h3>Delares sapiente</h3>
                            <p>Sint et dolor voluptas minus possimus nostrum. Reiciendis commodi eligendi omnis quideme lorenda</p>
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
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a className="cta-btn" href="#">Call To Action</a>
                </div>
                </div>
            </div>
            </div>

        </section>




        <section id="contact" className="contact">

                <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                </div>

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="row gy-4">

                    <div className="col-lg-6">

                    <div className="row gy-4">
                        <div className="col-md-6">
                        <div className="info-item" data-aos="fade" data-aos-delay="200">
                            <i className="bi bi-geo-alt"></i>
                            <h3>Address</h3>
                            <p>A108 Adam Street</p>
                            <p>New York, NY 535022</p>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="info-item" data-aos="fade" data-aos-delay="300">
                            <i className="bi bi-telephone"></i>
                            <h3>Call Us</h3>
                            <p>+1 5589 55488 55</p>
                            <p>+1 6678 254445 41</p>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="info-item" data-aos="fade" data-aos-delay="400">
                            <i className="bi bi-envelope"></i>
                            <h3>Email Us</h3>
                            <p>info@example.com</p>
                            <p>contact@example.com</p>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="info-item" data-aos="fade" data-aos-delay="500">
                            <i className="bi bi-clock"></i>
                            <h3>Open Hours</h3>
                            <p>Monday - Friday</p>
                            <p>9:00AM - 05:00PM</p>
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

export default Home;
