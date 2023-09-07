import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery

function ConsultantAppointment() {
   
  return(
    <div>
      <Navbar />
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>Consultant Appointment List</h4>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Requrst Id</th>
                  <th>Job Seeker</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time Slot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">3</th>
                <td>NuwanTheekshana</td>
                <td>2022-09-15</td>
                <td>09:00:00 - 11:00:00</td>
                <td>
                <button type="button" className="btn btn-success">Accept</button> &nbsp;
                <button type="button" className="btn btn-danger">Reject</button> &nbsp;
                <button type="button" className="btn btn-primary">View Profile</button>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    )

}

export default ConsultantAppointment;
