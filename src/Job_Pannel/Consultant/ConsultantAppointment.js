import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import $ from 'jquery'; // jQuery
import Swal from 'sweetalert2';

function ConsultantAppointment() {
  const auth_userid = localStorage.getItem("id");
  const [showattachmentModal, setshowattachmentModal] = useState(false);
  const [viewattachment, setviewattachment] = useState(null);

  

  const tableRef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7103/api/JobRequest/JobRequest/${auth_userid}`);

      if ($.fn.DataTable.isDataTable('#tableId')) {
        tableRef.current.DataTable().destroy();
      }
      console.log(response.data);
      tableRef.current = $('#tableId').DataTable({
        data: response.data,
        columns: [
          { data: 'jobseekerRequestId', title: 'Request Id' },
          { data: 'userName', title: 'Job Seeker Name' },
          { data: 'request_date', title: 'Appointment Date' },
          { data: 'time_slot', title: 'Time Slot' },
          { data: 'job_Status', title: 'Status' },
          {
            data: null,
            render: renderActionButtons,
          },
        ],
        language: {
          emptyTable: 'No data available in table',
        },
      });
    } catch (error) {
      console.error('Error fetching data list', error);
    }
  };

  const renderActionButtons = (data, type, row) => {
    return (
      '<center>' +
      '<button type="button" class="btn btn-success btn-sm" onclick="window.handleAccept(' +
      row.jobseekerRequestId +
      ')"><i class="bi bi-pencil-square"></i> Accept</button>' +
      '&nbsp;' +
      '<button type="button" class="btn btn-danger btn-sm" onclick="window.handleReject(' +
      row.jobseekerRequestId +
      ')">Reject</button> &nbsp;' +
      '<button type="button" class="btn btn-primary btn-sm" onclick="window.handleattachment(\'' +
      row.attachment.replace(/'/g, "\\'") + // Properly escape single quotes
      '\')">View Profile</button>' +
      '</center>'
    );
  };
  


  useEffect(() => {
    fetchData();
  }, []);

  const handleattachmentModal = () => setshowattachmentModal(true);
  const handleCloseshowattachmentModal = () => setshowattachmentModal(false);
  window.handleattachment = (attachment_path) => {
    setviewattachment(attachment_path);
    handleattachmentModal();
  };

  window.handleAccept = async (request_id) => {
    try {
    const response = await axios.put(`https://localhost:7103/api/JobRequest/JobRequest/${request_id}?status=2`);
    Swal.fire({title: 'Success', text: response.data, icon: 'success' }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
        window.scrollTo({top: 0,behavior: 'smooth'});
      }
    });
    } catch (error) {
    console.error('Error accept request', error);
    }
};

window.handleReject = async (request_id) => {
  try {
  const response = await axios.put(`https://localhost:7103/api/JobRequest/JobRequest/${request_id}?status=3`);
  Swal.fire({title: 'Success', text: response.data, icon: 'success' }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
      window.scrollTo({top: 0,behavior: 'smooth'});
    }
  });
  } catch (error) {
  console.error('Error reject request', error);
  }
};


  
  
   
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
                  <th>Appointment Time From</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <Modal show={showattachmentModal} onHide={handleCloseshowattachmentModal} dialogClassName="modal-xl">
  <Modal.Header closeButton>
    <Modal.Title>View Attachment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <iframe src={`https://localhost:7103/${viewattachment}`} title="PDF Viewer" style={{ width: '100%', height: '500px' }}/>
  </Modal.Body>
  
</Modal>








      </div>



      



    )

}

export default ConsultantAppointment;
