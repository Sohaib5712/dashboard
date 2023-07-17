import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBar } from '..';
import { useAuthContext } from '../../hooks/useAuthContext';

const CourseForm = () => {
  const [course_name, setCourse] = useState('');
  const [desc, setDesc] = useState('');
  const [fee, setFee] = useState('');
  const [discount, setDiscount] = useState('');
  const [duration, setDuration] = useState('');
  const [teacher, setTeacher] = useState('');
  const [offer, setOffer] = useState('');
  const [content, setContent] = useState('');
  const [keyWords, setKeyWords] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userRole, setUserRole] = useState([]);

  // Fetch user data and set user role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?.user) {
          const response = await fetch(`http://localhost:4000/api/admin/user/${user.user}`);
          const data = await response.json();
          if (response.ok) {
            // User record found
            const userRole = data.users['role'];
            setUserRole(userRole);
          } else {
            // No record found or other error occurred
            console.error(data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user record:', error);
      }
    };
    fetchUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('course_name', course_name);
    formData.append('desc', desc);
    formData.append('fee', fee);
    formData.append('discount', discount);
    formData.append('duration', duration);
    formData.append('teacher', teacher);
    formData.append('offer', offer);
    formData.append('content', content);
    formData.append('keyWords', keyWords);
    formData.append('courseImage', courseImage);

    try {
      const response = await 
	  fetch('http://localhost:4000/api/admin/create', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setCourse('');
        setDesc('');
        setFee('');
        setDiscount('');
        setDuration('');
        setTeacher('');
        setOffer('');
        setContent('');
        setKeyWords('');
        setCourseImage(null);
        setError(null);
        navigate('/course');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Error creating course. Please try again.');
    }
  };

  return (
    <div className="add-form-page">
      <SideBar role={userRole} />
      <div className="add-form">
        <h1>Enter Course Data</h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-field">
              <label htmlFor="course">Course Name</label>
              <input type="text" id="course" placeholder="Subject" onChange={(e) => setCourse(e.target.value)} value={course_name} />
            </div>

            <div className="form-field">
              <label htmlFor="courseImage">Insert Image</label>
              <input type="file" id="courseImage" onChange={(e) => setCourseImage(e.target.files[0])} />
            </div>
          </div>

          <div className="row">
            <div className="form-field">
              <label htmlFor="fee">Fee</label>
              <input type="number" id="fee" onChange={(e) => setFee(e.target.value)} value={fee} />
            </div>
            <div className="form-field">
              <label htmlFor="discount">Discount</label>
              <input type="number" id="discount" placeholder="----" onChange={(e) => setDiscount(e.target.value)} value={discount} />
            </div>
          </div>

          <div className="row">
            <div className="form-field">
              <label htmlFor="duration">Duration</label>
              <input type="number" id="duration" placeholder="----" onChange={(e) => setDuration(e.target.value)} value={duration} />
            </div>
            <div className="form-field">
              <label htmlFor="teacher">Teacher</label>
              <input type="text" id="teacher" placeholder="----" onChange={(e) => setTeacher(e.target.value)} value={teacher} />
            </div>
          </div>

          <div className="row">
            <div className="form-field">
              <label htmlFor="offer">Offer</label>
              <input type="text" id="offer" placeholder="----" onChange={(e) => setOffer(e.target.value)} value={offer} />
            </div>
            <div className="form-field">
              <label htmlFor="content">Content</label>
              <input type="text" id="content" placeholder="----" onChange={(e) => setContent(e.target.value)} value={content} />
            </div>
          </div>

          <div className="row">
            <div className="form-field">
              <label htmlFor="keyWords">More Detail(Optional)</label>
              <textarea id="keyWords" placeholder="Text here..." onChange={(e) => setKeyWords(e.target.value)} value={keyWords} />
            </div>
            <div className="form-field">
              <label htmlFor="desc">Description</label>
              <textarea id="desc" placeholder="Text here..." onChange={(e) => setDesc(e.target.value)} value={desc} />
            </div>
          </div>

          <button type="submit" className="add-btn">Save</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
