import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBar } from '..';
import { useAuthContext } from "../../hooks/useAuthContext";

const CourseForm = () => {
    const [course_name, setCourse] = useState('');
    const [desc, setDesc] = useState('');
    const [fee, setFee] = useState('');
    const [discount, setDiscount] = useState('');
    const [duration, setDuration] = useState('');
    const [teacher, setTeacher] = useState('');

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
        const courseData = { course_name, desc, fee, discount, duration, teacher };
        const response = await fetch('http://localhost:4000/api/admin/create', {
            method: 'POST',
            body: JSON.stringify(courseData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setCourse('');
            setDesc('');
            setFee('');
            setDiscount('');
            setDuration('');
            setTeacher('');
            setError(null);
            navigate('/course');
        }
    };

    return (
        <div className='add-form-page'>
            <SideBar role={userRole} />
            <div className="add-form">
                <h1>Enter Course Data</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-field">
                            <label htmlFor="course">Course Name</label>
                            <input
                                type="text"
                                id='course'
                                placeholder='Subject'
                                onChange={(e) => setCourse(e.target.value)}
                                value={course_name}
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
                                onChange={(e) => setFee(e.target.value)}
                                value={fee}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="discount">Discount</label>
                            <input
                                type="number"
                                id='discount'
                                placeholder='----'
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
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
                                onChange={(e) => setDuration(e.target.value)}
                                value={duration}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="teacher">Teacher</label>
                            <input
                                type="text"
                                id='teacher'
                                placeholder='----'
                                onChange={(e) => setTeacher(e.target.value)}
                                value={teacher}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-field">
                            <label htmlFor="desc">Description</label>
                            <textarea
                                id='desc'
                                placeholder='Text here...'
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                            />
                        </div>
                    </div>

                    <button type="submit" className='add-btn'>Save</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default CourseForm;
