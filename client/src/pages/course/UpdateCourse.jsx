import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';

const UpdateCourse = () => {
    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);

    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    // Fetch user data and set user role
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.user) {
                    const response = await fetch(
                        `http://localhost:4000/api/admin/user/${user.user}`
                    );
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
                const response = await fetch(`/api/admin/course/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setCourse(data.course);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching Course record:', error);
            }
        };
        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        setCourse((prevCourse) => ({
            ...prevCourse,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/course/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/course');

            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating Student record:', error);
        }
    };

    return (
        <div className="student-page">
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className='add-form-page'>
                    {course ? (

                        <div className="add-form">
                            <h1>Enter Course Data</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="course">Course Name</label>
                                        <input
                                            type="text"
                                            id='course'
                                            name="course_name"
                                            placeholder='Subject'
                                            onChange={handleChange}
                                            value={course.course_name}
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="fee">Fee</label>
                                        <input
                                            type="number"
                                            id='fee'
                                            placeholder='----'
                                            name='fee'
                                            onChange={handleChange}
                                            value={course.fee}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="discount">Discount</label>
                                        <input
                                            type="number"
                                            id='discount'
                                            placeholder='----'
                                            name='discount'
                                            onChange={handleChange}
                                            value={course.discount}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="duration">Duration</label>
                                        <input
                                            type="number"
                                            id='duration'
                                            placeholder='----'
                                            name='duration'
                                            onChange={handleChange}
                                            value={course.duration}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="teacher">Teacher</label>
                                        <input
                                            type="text"
                                            id='teacher'
                                            placeholder='----'
                                            name='teacher'
                                            onChange={handleChange}
                                            value={course.teacher}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="desc">Description</label>
                                        <textarea
                                            id='desc'
                                            placeholder='Text here...'
                                            name='desc'
                                            onChange={handleChange}
                                            value={course.desc}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className='add-btn'>Save</button>
                            </form>
                        </div>
                    ) : (<p>Loading...</p>)}

                </div>
            </div>
        </div>
    );
};

export default UpdateCourse;

