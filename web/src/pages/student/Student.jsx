/* The above code is a React component that displays a table of students fetched from an API. It also
allows the user to add, edit, and delete student records. The component uses hooks such as
`useEffect` and `useState` to manage state and fetch data from the API. It also uses the
`useNavigate` hook from the `react-router-dom` library to navigate to different pages. The component
also renders a sidebar and header component based on the user's role. */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './student.css';
import { SideBar, Header } from '../../components';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import CallStatus from './callStatus';
import { RiQuillPenFill, RiDeleteBinLine } from "react-icons/ri";

const Student = () => {
    const { students, dispatch } = useWorkoutsContext();
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const [userRole, setUserRole] = useState([]);

    const handleEdit = (rowId) => {
        navigate(`/std-update/${rowId}`);
    };

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

    // fetch students
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin');
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json });
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };

        fetchStudents();
    }, [dispatch]);

    // delete the selected row
    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/admin/${studentId}`, {
                method: 'DELETE',
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_STUDENT', payload: studentId });
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    return (
        <div className='student-page'>
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="mx-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="student-heading">
                                <h3>Total Number of students: {students ? students.length : 0}</h3>
                                {!(user.role === "call status") && (
                                    <Link to="/add">
                                        <div className="add-btn">
                                            <span className="add-icon">+</span> Add Student
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr#</th>
                                        <th>Student Name</th>
                                        <th>Student Email</th>
                                        <th>Gender</th>
                                        <th>Contact Number</th>
                                        <th>Interested In</th>
                                        <th>Date</th>
                                        <th>Call Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students &&
                                        students.map((student, index) => (
                                            <tr key={student._id}>
                                                <td>{index + 1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.gender}</td>
                                                <td>{student.phone}</td>
                                                <td>{Array.isArray(student.subject) ? student.subject.join(", ") : ""}</td>
                                                <td>{new Date(student.date).toLocaleDateString()}</td>
                                                <CallStatus student={student} index={index} />
                                                <td className='student-field-action'>
                                                    <RiQuillPenFill
                                                        size={25}
                                                        color="#FFB400"
                                                        style={{ margin: '0px 1rem' }}
                                                        onClick={() => handleEdit(student._id)}
                                                    />
                                                    <RiDeleteBinLine
                                                        size={25}
                                                        color='#F04445'
                                                        onClick={() => handleDeleteStudent(student._id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Student;
