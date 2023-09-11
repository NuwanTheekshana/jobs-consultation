import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function ConsultantTimeShadule() {
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7103/api/ConsultantTime/ConsultantTime`);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }

      console.log(response.data);

      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'con_Time_Id', title: 'Consultant Id' },
          { data: 'consultantName', title: 'Consultant Name' },
          { data: 'time_From', title: 'From Time' },
          { data: 'time_To', title: 'To Time' }
        ],
        language: {
          emptyTable: 'No data available in table',
        },
      });
    } catch (error) {
      console.error('Error fetching time slot', error);
    }
  };

  return (
    <div>
      <Navbar />
      <br></br>
        <br></br>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>All Consultants available times</h4>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-danger btn-sm"
              table="tableId"
              filename="TimeShadule_report"
              sheet="report"
              buttonText="Download Report"
            />
          </div>
          <div className="card-body">
            <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Consult Id</th>
                  <th>Consult Name</th>
                  <th>From Time</th>
                  <th>To Time</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultantTimeShadule;
