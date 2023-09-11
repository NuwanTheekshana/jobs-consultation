import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function JobSeekerList() {


  const [JobSeeker, setJobSeeker] = useState([]); 
  

  useEffect(() => {
    fetchData();
  }, []);


  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7103/api/Registration/Jobseeker');
      setJobSeeker(response.data);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      console.log(response.data);
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'job_Seeker_Id', title: 'JobSeeker Id' },
          { data: 'userName', title: 'User Name' },
          { data: 'email', title: 'Email' },
          { data: 'telNo', title: 'Tel Number' },
          { data: 'address', title: 'Address' },
        ],
        language: {
          emptyTable: 'No data available in table',
        },
      });
    } catch (error) {
      console.error('Error fetching JobSeeker list', error);
    }
  };



  return(
    <div>
      <Navbar />
        <br></br>
        <br></br>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center small">
            <h4>All JobSeeker List</h4>
            <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-danger btn-sm" table="tableId" filename="JobSeeker_report" sheet="report" buttonText="Download Report"/>
          </div>
          <div className="card-body">
          <table id="tableId" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>



    </div>
  )
}

export default JobSeekerList;
