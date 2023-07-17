import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SideBar, Header } from '../../components';
import { useAuthContext } from "../../hooks/useAuthContext";

const EditForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        subject: [],
    });
    const { user } = useAuthContext();

    const [userRole, setUserRole] = useState([]);
    const navigate = useNavigate();
    const genderOption = ['Male', 'Female'];
    const [gender, setGender] = useState('');
    const [courses, setCourses] = useState(null);

    // Fetch user data and set user role
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
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/admin/${id}`); // Update the endpoint URL accordingly
                const data = await response.json();
                if (response.ok) {
                    setFormData(data.student);
                    setGender(data.student.gender)
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching student record:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'gender') {
            setGender(e.target.value); // Update the gender state
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [e.target.name]: e.target.value,
            }));
        }
    };

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
        setFormData((prevFormData) => {
            if (checked) {
                return {
                    ...prevFormData,
                    subject: [...prevFormData.subject, value],
                };
            } else {
                return {
                    ...prevFormData,
                    subject: prevFormData.subject.filter((item) => item !== value),
                };
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/admin/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/');
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating student record:', error);
        }
    };

    return (
        <div className='student-page'>
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                {formData ? (
                    <div className="add-form">
                        <h1>Enter Student Data</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-field">
                                    <label htmlFor="name">Student Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Fenix"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-field">
                                    <label htmlFor="phone">Contact Number</label>
                                    <input
                                        type="number"
                                        id="number"
                                        name="phone"
                                        placeholder="03**-*******"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="someone@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" name="gender" onChange={handleChange} value={gender}>
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
                                                checked={formData.subject && formData.subject.includes(course.course_name)}
                                            />
                                            {course.course_name}
                                        </label>
                                    ))}

                            </div>
                            <button type="submit" className="add-btn">
                                Save
                            </button>
                        </form>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default EditForm;
