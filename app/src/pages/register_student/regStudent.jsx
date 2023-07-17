import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';
import { SideBar, Header } from '../../components';
import { RiQuillPenFill, RiDeleteBinLine, RiEyeFill } from 'react-icons/ri';
import Modal from 'react-modal';
import Search from '../student/Search';

const RegStudent = () => {
  const { students, dispatch } = useWorkoutsContext();
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const [userRole, setUserRole] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleEdit = (rowId) => {
    navigate(`/reg-update/${rowId}`);
  };

  // Fetch user data and set user role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?.user) {
          const response = await fetch(`http://localhost:4000/api/admin/user/${user.user}`);
          const data = await response.json();
          if (response.ok) {
            const userRole = data.users['role'];
            console.log(`your role is ${userRole}`);
            setUserRole(userRole);
          }
          else {
            console.error(data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user record:', error);
      }
    };
    fetchUser();
  }, [user]);

  // Delete row
  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/register/${studentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch({ type: 'DELETE_STUDENT', payload: studentId });
      } else {
        const error = await response.json();
        console.error('Delete Error:', error);
      }
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  // Fetch register student data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/register');
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    fetchStudents();
  }, [dispatch]);

  const handlePass = (student) => {
    const updatedStudents = students.filter((s) => s._id !== student._id);
    dispatch({ type: 'SET_WORKOUTS', payload: updatedStudents });
    navigate('/pass', { state: { student } });
  };

  
  return (
    <div className="student-page">
      <SideBar role={userRole} />
      <div className="student-content">
        <Header role={userRole} />
        <Search />
        <div className="student-heading">
          <h3>Total Number of users: {students ? students.length : 0}</h3>
          <Link to="/add-reg-student">
            <div className="add-btn">
              <span className="add-icon">+</span> Add Student
            </div>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Course Applied For</th>
              <th>Batch Name</th>
              <th>Timing</th>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((user) => (
                <tr key={user._id}>
                  <td>{user.roll_no}</td>
                  <td>{user.courseAppliedFor}</td>
                  <td>{user.batchName}</td>
                  <td>{user.timing}</td>
                  <td>{user.name}</td>
                  <td>{user.fatherName}</td>
                  <td>{user.contactNumber}</td>
                  <td>{user.status}</td>
                  <td className="student-field-action">
                    <RiEyeFill size={25} color="#0a142f" onClick={() => openModal(user)} />
                    <RiQuillPenFill size={25} color="#FFB400" style={{ margin: '0px 1rem' }} onClick={() => handleEdit(user._id)} />
                    <RiDeleteBinLine size={25} color="#F04445" onClick={() => handleDeleteStudent(user._id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedUser && (
        <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="User Information" className="custom-modal">
          <h1>Register Student</h1>
          <ul>
            <div className="row">
              <li><span>Course Applied For: </span>{selectedUser.courseAppliedFor}</li>
              <li><span>Batch Name: </span>{selectedUser.batchName}</li>
              <li><span>Timing: </span>{selectedUser.timing}</li>
            </div>
            <h1>Personal Information</h1>
            <li><span>Student Name: </span>{selectedUser.name}</li>
            <li><span>Father's Name: </span>{selectedUser.fatherName}</li>
            <li><span>Email: </span>{selectedUser.email}</li>
            <div className="row">
              <li><span>Religion: </span>{selectedUser.religion}</li>
              <li><span>CNIC: </span>{selectedUser.cnic}</li>
            </div>
            <li><span>Date of Birth: </span>{selectedUser.dateOfBirth}</li>
            <li><span>Nationality: </span>{selectedUser.nationality}</li>
            <li><span>Mailing Address: </span>{selectedUser.mailingAddress}</li>
            <li><span>Contact Numbers: </span>{selectedUser.contactNumber}</li>
            <li><span>Father's Numbers: </span>{selectedUser.fatherNumber}</li>
          </ul>
          <button className='add-btn' onClick={closeModal}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default RegStudent;
