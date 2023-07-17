import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';

const FeeForm = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState([]);
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [formFields, setFormFields] = useState({
        date: new Date().toISOString().slice(0, 10),
        course: '',
        admissionChecked: true,
        feeChecked: true,
        installment: '',
        receivedAmount: '',
        from: '',
    });

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

    useEffect(() => {
        if (student) {
            const { feeStatus } = student;
            const installment = feeStatus === 'None' ? 'first' : 'second';
            setFormFields((prevFields) => ({ ...prevFields, installment }));
        }
    }, [student]);

    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormFields((prevFields) => ({ ...prevFields, [name]: fieldValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/api/admin/register/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stdFee: {
                        ...student.stdFee,
                        [formFields.installment]: formFields.receivedAmount,
                    },
                    feeStatus: formFields.installment === 'first' ? 'first' : 'second',
                    payFee: {
                        ...student.payFee,
                        [formFields.installment]: formFields.receivedAmount,
                    },
                    payFeeFrom: {
                        ...student.payFeeFrom,
                        [formFields.installment]: formFields.from,
                    },
                    feeDate: {
                        ...student.feeDate,
                        [formFields.installment]: new Date(formFields.date),
                    },
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormFields({
                    date: new Date().toISOString().slice(0, 10),
                    course: '',
                    admissionChecked: true,
                    feeChecked: true,
                    installment: '',
                    receivedAmount: '',
                    from: '',
                });
                navigate('/std-fee');
                console.log('Form submitted successfully');
            } else {
                // Handle form submission error, such as displaying an error message
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    return (
        <div className="student-page">
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                {student ? (
                    <>
                        <h1 className="ms-5 mt-3">Fee Form</h1>
                        <form className="fee-form container" onSubmit={handleSubmit}>
                            <div className="d-flex">
                                <div className="form-field">
                                    <label htmlFor="roll_no">Roll No</label>
                                    <input type="text" name="" id="roll_no" value={student.roll_no} disabled />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="std-name">Roll No</label>
                                    <input type="text" name="" id="std_name" value={student.name} disabled />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formFields.date}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="course">Course:</label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={student.courseAppliedFor}
                                    onChange={handleFieldChange}
                                    disabled
                                />
                            </div>
                            <div className="checkbox">
                                <b><label>Payment Type:</label></b>
                                <div className="checkbox-group">
                                    <label htmlFor="admissionCheckbox">
                                        <input
                                            type="checkbox"
                                            id="admissionCheckbox"
                                            name="admissionChecked"
                                            checked={formFields.admissionChecked}
                                            onChange={handleFieldChange}
                                        />
                                        Admission
                                    </label>
                                    <label htmlFor="feeCheckbox" className='ms-5'>
                                        <input
                                            type="checkbox"
                                            id="feeCheckbox"
                                            name="feeChecked"
                                            checked={formFields.feeChecked}
                                            onChange={handleFieldChange}
                                        />
                                        Fee
                                    </label>
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="installment">Installment #:</label>
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        id="installment"
                                        name="installment"
                                        value={formFields.installment}
                                        onChange={handleFieldChange}
                                        disabled
                                    />
                                    <p className='mt-3 ms-5'><b>Amount: </b>
                                        {formFields.installment === 'first' ? student.stdFee.first : student.stdFee.second}</p>
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="receivedAmount">Received a Sum of Rs:</label>
                                <input
                                    type="number"
                                    id="receivedAmount"
                                    name="receivedAmount"
                                    value={formFields.receivedAmount}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="from">From Mr./Mrs./Ms:</label>
                                <input
                                    type="text"
                                    id="from"
                                    name="from"
                                    value={formFields.from}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <button type="submit" className='add-btn float-end m-5'>Submit</button>
                        </form>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div >
    );
};

export default FeeForm;
