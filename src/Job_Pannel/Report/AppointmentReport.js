import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery

function AppointmentReport() {
   
  return(
    <div>
      <Navbar />
      <div className="container px-4">

      <div className="card mt-4">
        <div className="card-body">


            <div className="form-group mb-2">
                      <label for="Status" className="col-2 form-label">Status </label>
                      <select class="form-select" >
                      <option selected>Status</option>
                      <option value="1">Pending</option>
                      <option value="2">Accept</option>
                    </select>
                      
                      
                    <label for="find_name" className="col-2 form-label">User Name</label>
                    <input type="text" id="find_name" className="form-control col-sm-3" aria-describedby="find_name" name="find_name" />
                      <br></br>
                    <center>
                    <button className="btn btn-warning"> Search</button>
                    </center>
              </div>
          </div>
        </div>

        

        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Appointment Report</h4>
            <Button variant="danger" size="sm">
              Download Report
            </Button>
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
              <tr>
                <th scope="row">3</th>
                <td>NuwanTheekshana</td>
                <td>Namal Perera</td>
                <td>2022-09-15</td>
                <td>09:00:00 - 11:00:00</td>
                <td>Accept</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    )
  

}

export default AppointmentReport;
