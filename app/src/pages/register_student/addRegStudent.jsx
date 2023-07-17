import React, { useState, useEffect } from 'react';
import './regstudent.css';
import { SideBar, Header } from '../../components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const AdmissionForm = () => {
  const { user } = useAuthContext();
  const [userRole, setUserRole] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

//   Fetch user data and set user role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?.user) {
          const response = await fetch(`http://localhost:4000/api/admin/user/${user.user}`);
          const data = await response.json();
          if (response.ok) {
            const userRole = data.users['role'];
            setUserRole(userRole);
          } else {
            console.error(data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user record:', error);
      }
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/course');
        const data = await response.json();
        if (response.ok) {
          setCourses(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourse();
  }, []);

  const [formData, setFormData] = useState({
    batchName: '',
    courseAppliedFor: '',
    timing: '',
    name: '',
    fatherName: '',
    religion: '',
    cnic: '',
    dateOfBirth: '',
    nationality: '',
    mailingAddress: '',
    contactNumber: '',
    fatherNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          batchName: '',
          courseAppliedFor: '',
          timing: '',
          name: '',
          fatherName: '',
          religion: '',
          cnic: '',
          dateOfBirth: '',
          nationality: '',
          mailingAddress: '',
          contactNumber: '',
          fatherNumber: '',
          email: '',
        });
        navigate('/reg-student');
      } else {
        // Error occurred while storing form data
        console.error('Form data submission error:', data.error);
      }
    } catch (error) {
      console.error('Form data submission error:', error);
    }
  };

  return (
    <div className="student-page">
      <SideBar role={userRole} />
      <div className="student-content">
        <Header role={userRole} />

        <div className="admission-form-container">
          <h2>Admission Form</h2>
          <form className="admission-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseAppliedFor">Course Applied For</label>
                <select
                  id="courseAppliedFor"
                  name="courseAppliedFor"
                  value={formData.courseAppliedFor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course.course_name}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="batchName">Batch Name</label>
                <input
                  type="text"
                  id="batchName"
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="timing">Timing</label>
                <input
                  type="text"
                  id="timing"
                  name="timing"
                  value={formData.timing}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fatherName">Father's Name</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="religion">Religion</label>
              <input
                type="text"
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnic">CNIC</label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mailingAddress">Mailing Address</label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fatherNumber">Father's Number</label>
              <input
                type="text"
                id="fatherNumber"
                name="fatherNumber"
                value={formData.fatherNumber}
onChange={handleChange}
                required
              />
            <div className="form-group">
              <label htmlFor="fatherNumber">Status</label>
              {/* <input
                type="text"
                id="fatherNumber"
                name="status"
                value={formData.status}
onChange={handleChange}
                required
              /> */}
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button className="add-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
