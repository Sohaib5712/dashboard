/* The above code is a React component that renders a form for adding student data. It uses useState
and useEffect hooks to manage the form state and fetch data from an API. It also uses the
useNavigate hook from react-router-dom to navigate to a different page after the form is submitted.
The form includes input fields for student name, contact number, email, gender, and checkboxes for
selecting subjects. The handleSubmit function is called when the form is submitted, which sends a
POST request to the API with the student data. If the request is successful, the form is reset and
the user is navigated to */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './addform.css';
import { SideBar } from '..';
import { useAuthContext } from "../../hooks/useAuthContext";
import Header from '../header/Header'
const AddForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState([]);
    const [gender, setGender] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);


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



    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch('http://localhost:4000/api/admin/course');
            const json = await response.json();
            if (response.ok) {
                setCourses(json);
            }
        };
        fetchCourse();
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSubject((prevSubjects) => [...prevSubjects, value]);
        } else {
            setSubject((prevSubjects) => prevSubjects.filter((item) => item !== value));
        }
    };



    const genderOption = ['Male', 'Female'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = { name, email, phone, subject, gender };
        const response = await fetch('http://localhost:4000/api/admin/', {
            method: 'POST',
            body: JSON.stringify(studentData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setName('');
            setEmail('');
            setPhone('');
            setGender('');
            setSubject([]);
            setError(null);
            navigate('/');
        }
    };

    return (
        <div className="add-form-page">
            <SideBar role={userRole} />
            <div className="add-form">
            <Header role={userRole} />
                <h1>Enter Student Data</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-field">
                            <label htmlFor="name">Student Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Fenix"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-field">
                            <label htmlFor="number">Contact Number</label>
                            <input
                                type="number"
                                id="number"
                                placeholder="03**-*******"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="someone@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                            <option value="">Gender</option>
                            {genderOption.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="checkbox">
                        <p>Interested In (Subject)</p>
                        {courses &&
                            courses.map((course) => (
                                <label key={course.course_name}>
                                    <input
                                        type="checkbox"
                                        value={course.course_name}
                                        onChange={handleCheckboxChange}
                                        checked={subject.includes(course.course_name)}
                                    />
                                    {course.course_name}
                                </label>
                            ))}

                    </div>
                    <button type="submit" className="add-btn">
                        Save
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddForm;
