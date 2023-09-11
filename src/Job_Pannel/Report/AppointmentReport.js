import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import Swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function AppointmentReport() {
  const [formData, setFormData] = useState({
    find_status: '',
  });
  const [formErrors, setFormErrors] = useState({
    find_status: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [Report, setReport] = useState([]);

  const handleSearch = async () => {
    try {
      const errors = {};
      if (!formData.find_status) {
        errors.find_status = 'Job Status is required.';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        Swal.fire({title: 'Warnning', text: "Something went wrong..!", icon: 'error' }).then((result) => {
          if (result.isConfirmed) {
            window.scrollTo({top: 0,behavior: 'smooth'});
          }
        });
        return;
      }
      const response = await axios.get(`https://localhost:7103/api/Report/Report/AppointmentList/${formData.find_status}`);
      setReport(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Report Failed', error);
    }
  };



  return(
    <div>
      <Navbar />
      <br></br>
        <br></br>
      <div className="container px-4">

      <div className="card mt-4">
        <div className="card-body">

            <form>
            <div className="form-group mb-2">
                <label htmlFor="find_status" className="col-2 form-label"><b>Job Status</b> </label>
                    <select className={`form-control ${formErrors.find_status ? 'is-invalid' : ''}`} name="find_status" id="find_status" onChange={handleInputChange}>
                      <option>Select a Status</option>
                      <option value="1">Pending</option>
                      <option value="2">Accept</option>
                      <option value="3">Reject</option>
                    </select>
                    {formErrors.find_status && (<div className="invalid-feedback">{formErrors.find_status}</div>)}
                      <br></br>
                    <center>
                    <button type="button" className="btn btn-warning" onClick={handleSearch}> Search</button>
                    </center>
              </div>
            </form>
            
          </div>
        </div>

        

        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Appointment Report</h4>
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-danger btn-sm"
            table="tableId"
            filename="appointment_report"
            sheet="report"
            buttonText="Download Report"
          />

          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Requrst Id</th>
                  <th>Job Seeker</th>
                  <th>Job Consultant</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time Slot</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {Report.map((Report) => (
                  <tr key={Report.requestId}>
                    <td>{Report.requestId}</td>
                    <td>{Report.jobSeeker}</td>
                    <td>{Report.jobConsultant}</td>
                    <td>{Report.appointmentDate}</td>
                    <td>{Report.appintmentTimeSlot}</td>
                    <td>{Report.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    )
  

}

export default AppointmentReport;
