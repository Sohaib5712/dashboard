import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { SideBar, Header } from '../../components';
import { useAuthContext } from "../../hooks/useAuthContext";
import { RiQuillPenFill, RiDeleteBinLine } from "react-icons/ri";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";


const Course = () => {
    const { students, dispatch } = useWorkoutsContext();
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

// fetch all course
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/course');
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json });
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };

        fetchCourse();
    }, [dispatch]);

    // delete the slected row
    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`/api/admin/course/${courseId}`, {
                method: 'DELETE',
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_STUDENT', payload: courseId });
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

// update course
const handleUpdateCourse = (rowId) => {
    navigate(`/course-update/${rowId}`);
};

    return (
        <div className='student-page'>
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="student-heading">
                    <h3>Total Number of Course: {students ? students.length : 0}</h3>
                    <Link to="/addcourse">
                        <div className="add-btn">
                            <span className="add-icon">+</span> Add Student
                        </div>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Course Number</th>
                            <th>Description</th>
                            <th>Fee</th>
                            <th>Discount</th>
                            <th>Duration</th>
                            <th>Teacher Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students &&
                            students.map((course, index) => (
                                <tr key={course._id}>
                                    <td>{index + 1}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.desc}</td>
                                    <td>{course.fee}</td>
                                    <td>{course.discount}</td>
                                    <td>{course.duration}</td>
                                    <td>{course.teacher}</td>
                                    <td className='student-field-action'>
                                        <RiQuillPenFill
                                            size={25}
                                            color="#FFB400"
                                            style={{ margin: '0px 1rem' }}
                                            onClick={() => handleUpdateCourse(course._id)}
                                        />
                                        <RiDeleteBinLine
                                            size={25}
                                            color='#F04445'
                                            onClick={() => handleDeleteCourse(course._id)}
                                            
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Course
