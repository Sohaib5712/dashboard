/* The above code is a React component that allows an admin user to update a student registration
record. It fetches the user data and sets the user role using the useAuthContext hook. It also
fetches the student data using the useParams hook and sets it using the useState hook. The component
renders a form with fields for course information, personal information, and academic information.
The academic information section allows the user to add and remove academic records dynamically.
When the form is submitted, it sends a PUT request to update the student record in the database. */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';

const UpdateReg = () => {
    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);
    const { id } = useParams();
    const [student, setStudent] = useState(null);
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

    // Fetch student data
/* The above code is using the useEffect hook in React to fetch a student record from a server. It
makes an asynchronous request to the specified URL
(`http://localhost:4000/api/admin/register/`) using the fetch function. If the response is
successful (status code 200), it sets the fetched student data to the state variable `student` using
the `setStudent` function. If the response is not successful, it logs the error message from the
server. If there is an error during the fetch request, it logs an error message to the console. The
useEffect hook is triggered whenever */
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/admin/register/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setStudent(data.student);
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
        const { name, value } = e.target;
        if (name.startsWith("installment")) {
            setStudent((prevStudent) => ({
                ...prevStudent,
                stdFee: {
                    ...prevStudent.stdFee,
                    [name]: value,
                },
            }));
        } else {
            setStudent((prevStudent) => ({
                ...prevStudent,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/register/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/reg-student');
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating student record:', error);
        }
    };

    const handleAcademicRecordChange = (index, field, value) => {
        const updatedAcademicRecords = [...student.academicRecords];
        updatedAcademicRecords[index][field] = value;
        setStudent((prevStudent) => ({
            ...prevStudent,
            academicRecords: updatedAcademicRecords,
        }));
    };

    const handleAddAcademicRecord = () => {
        const updatedAcademicRecords = [
            ...student.academicRecords,
            { degree: '', institute: '', year: '', marks: '' },
        ];
        setStudent((prevStudent) => ({
            ...prevStudent,
            academicRecords: updatedAcademicRecords,
        }));
    };

    const handleRemoveAcademicRecord = (index) => {
        const updatedAcademicRecords = [...student.academicRecords];
        updatedAcademicRecords.splice(index, 1);
        setStudent((prevStudent) => ({
            ...prevStudent,
            academicRecords: updatedAcademicRecords,
        }));
    };
    return (
        <div className="student-page">
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                {student ? (
                    <div className="admission-form-container">
                        <h2>Admission Form</h2>
                        <form className="admission-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="courseAppliedFor">Course Applied For</label>
                                    <input
                                        type="text"
                                        id="courseAppliedFor"
                                        name="courseAppliedFor"
                                        value={student.courseAppliedFor}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="batchName">Batch Name</label>
                                    <input
                                        type="text"
                                        id="batchName"
                                        name="batchName"
                                        value={student.batchName}
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
                                        value={student.timing}
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
                                    value={student.name}
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
                                    value={student.fatherName}
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
                                    value={student.religion}
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
                                    value={student.cnic}
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
                                    value={student.nationality}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mailingAddress">Mailing Address</label>
                                <textarea
                                    id="mailingAddress"
                                    name="mailingAddress"
                                    value={student.mailingAddress}
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
                                    value={student.contactNumber}
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
                                    value={student.fatherNumber}
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
                                    value={student.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <h3>Academic Information</h3>
                            {student.academicRecords.map((record, index) => (
                                <div key={index} className="academic-record">
                                    <h4>Academic Record {index + 1}</h4>
                                    <div className="form-row gap-2">

                                        <div className="form-group">
                                            <label htmlFor={`degree-${index}`}>Degree</label>
                                            <input
                                                type="text"
                                                id={`degree-${index}`}
                                                name={`degree-${index}`}
                                                value={record.degree}
                                                onChange={(e) =>
                                                    handleAcademicRecordChange(index, 'degree', e.target.value)
                                                }
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
                                                onChange={(e) =>
                                                    handleAcademicRecordChange(index, 'institute', e.target.value)
                                                }
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
                                                onChange={(e) =>
                                                    handleAcademicRecordChange(index, 'year', e.target.value)
                                                }
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
                                                onChange={(e) =>
                                                    handleAcademicRecordChange(index, 'marks', e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <button type="button" className='close-btn' onClick={() => handleRemoveAcademicRecord(index)}>
                                            <RiCloseFill />
                                        </button>
                                    </div>

                                </div>
                            ))}
                            <button
                                className="add-academic-record acd-add-btn"
                                onClick={handleAddAcademicRecord}
                            >
                                Add Academic Record
                            </button>

                            {/* Fee Information */}
                            <h3>Fee Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="installment1">Installment 1</label>
                                    <input
                                        type="number"
                                        id="installment1"
                                        name="first"
                                        value={student.stdFee.first}
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
                                        value={student.stdFee.second}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>
                            <button className="add-btn" type="submit">Submit</button>
                        </form>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default UpdateReg;
