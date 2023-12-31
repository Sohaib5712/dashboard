/* The above code is a React component called `AdmissionForm`. It is a form that allows users to submit
an admission application. */
import React, { useState, useEffect } from 'react';
import './regstudent.css';
import { SideBar, Header } from '../../components';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import { RiCloseFill } from "react-icons/ri";

const AdmissionForm = () => {
    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const navigate = useNavigate();

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

    // Fetch course data and set course options
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/course');
                const data = await response.json();
                if (response.ok) {
                    const courseNames = data.map(course => course.course_name);
                    setCourseOptions(courseNames);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };
        fetchCourses();
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
        academicRecords: [],
        stdFee: {
            first: '',
            second: ''
        }
    });

    const handleAcademicRecordChange = (index, field, value) => {
        const updatedAcademicRecords = [...formData.academicRecords];
        updatedAcademicRecords[index][field] = value;
        setFormData({ ...formData, academicRecords: updatedAcademicRecords });
    };

    const handleAddAcademicRecord = () => {
        const updatedAcademicRecords = [...formData.academicRecords, { degree: '', institute: '', year: '', marks: '' }];
        setFormData({ ...formData, academicRecords: updatedAcademicRecords });
    };

    const handleRemoveAcademicRecord = (index) => {
        const updatedAcademicRecords = [...formData.academicRecords];
        updatedAcademicRecords.splice(index, 1);
        setFormData({ ...formData, academicRecords: updatedAcademicRecords });
    };

/**
 * The handleChange function updates the form data based on the input value and name.
 */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'first' || name === 'second') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                stdFee: {
                    ...prevFormData.stdFee,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
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
                    academicRecords: [],
                    stdFee: {
                        first: '',
                        second: ''
                    }
                });
                navigate('/reg-student');
            } else {
                console.error('Form data submission error:', data.error);
            }
        } catch (error) {
            console.error('Form data submission error:', error);
        }
    };

    return (
        <div className='student-page'>
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
                                    <option value="">Select Course</option>
                                    {courseOptions.map((course, index) => (
                                        <option key={index} value={course}>{course}</option>
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
                        <h3>Academic Records</h3>
                        {formData.academicRecords.map((record, index) => (
                            <div key={index} className="form-row gap-2">
                                <div className="form-group">
                                    <label htmlFor={`degree-${index}`}>Degree</label>
                                    <input
                                        type="text"
                                        id={`degree-${index}`}
                                        name={`degree-${index}`}
                                        value={record.degree}
                                        onChange={(e) => handleAcademicRecordChange(index, 'degree', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`institute-${index}`}>Institute</label>
                                    <input
                                        type="text"
                                        id={`institute-${index}`}
                                        name={`institute-${index}`}
                                        value={record.institute}
                                        onChange={(e) => handleAcademicRecordChange(index, 'institute', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`year-${index}`}>Year</label>
                                    <input
                                        type="text"
                                        id={`year-${index}`}
                                        name={`year-${index}`}
                                        value={record.year}
                                        onChange={(e) => handleAcademicRecordChange(index, 'year', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`marks-${index}`}>Marks</label>
                                    <input
                                        type="text"
                                        id={`marks-${index}`}
                                        name={`marks-${index}`}
                                        value={record.marks}
                                        onChange={(e) => handleAcademicRecordChange(index, 'marks', e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="button" className='close-btn' onClick={() => handleRemoveAcademicRecord(index)}>
                                    <RiCloseFill />
                                </button>
                            </div>
                        ))}
                        <button type="button" className='acd-add-btn' onClick={handleAddAcademicRecord}>
                            Add Academic Record
                        </button>

                        <h3>Fee</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="installment1">Installment 1</label>
                                <input
                                    type="number"
                                    id="installment1"
                                    name="first"
                                    value={formData.stdFee.first}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="installment2">Installment 2</label>
                                <input
                                    type="number"
                                    id="installment2"
                                    name="second"
                                    value={formData.stdFee.second}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button className='add-btn' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdmissionForm;
