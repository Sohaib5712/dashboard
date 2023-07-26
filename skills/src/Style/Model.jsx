import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiCrossedBones } from 'react-icons/gi';
const Model = () => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchCourseOptions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/course');
        const data = response.data;
        if (response.status === 200) {
          setCourseOptions(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourseOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', name);
    formData.append('fatherName', fatherName);
    formData.append('course', course);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/api/blog/dataEnroll', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('successfully enrolled! within 2-3 day our team contact you.');

      console.log(response.data);
      // Reset form fields
      setName('');
      setFatherName('');
      setCourse('');
      setEmail('');
      setContact('');
      setImage(null);

    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-transparent" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Enroll Now
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5 mx-auto" style={{ color: 'black' }} id="staticBackdropLabel">
                Submit to Enroll
              </h3>
              <button type="button" style={{ border: 'white 2px solid' }} data-bs-dismiss="modal">
                <GiCrossedBones />
              </button>
            </div>
            <div className="modal-body mt-4">
              <div className="" style={{ color: 'black' }}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="form-label d-flex" style={{ marginLeft: '4rem' }}>
                      Name:
                      <div style={{ marginLeft: '4.8rem', border: 'black 2px solid', borderRadius: '.4rem' }}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-label d-flex" style={{ marginLeft: '4rem' }}>
                      Father Name:
                      <div style={{ marginLeft: '1.8rem', border: 'black 2px solid', borderRadius: '.4rem' }}>
                        <input
                          type="text"
                          className="form-control"
                          value={fatherName}
                          onChange={(e) => setFatherName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-label d-flex" style={{ marginLeft: '4rem' }}>
                      Select Course:
                      <div style={{ marginLeft: '1.5rem', border: 'black 2px solid', borderRadius: '.4rem' }}>
                        <select
                          id="courseAppliedFor"
                          name="courseAppliedFor"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          required
                        >
                          <option value="">Select a course</option>
                          {courseOptions.map((course) => (
                            <option key={course._id} value={course.course_name}>
                              {course.course_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex" style={{ marginLeft: '4rem' }}>
                      Email address:
                      <div style={{ marginLeft: '1.5rem', border: 'black 2px solid', borderRadius: '.4rem' }}>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-label d-flex" style={{ marginLeft: '4rem' }}>
                      Contact No.
                      <div style={{ marginLeft: '2.5rem', border: 'black 2px solid', borderRadius: '.4rem' }}>
                        <input
                          type="number"
                          className="form-control"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-label d-flex" style={{ marginLeft: '4rem' }}>
                      Image:
                      <div style={{ marginLeft: '4.7rem' }}>
                        <input type="file" className="border border-white" required onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="mt-3 btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Model;