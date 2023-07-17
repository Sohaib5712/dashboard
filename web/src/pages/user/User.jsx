/* This is a React component called `User` that displays a table of users fetched from an API endpoint.
It uses various React hooks such as `useEffect` and `useState` to manage state and fetch data. It
also uses other React components such as `Link`, `SideBar`, and `Header` to create a user interface.
The component allows the user to add, update, and delete users from the table. */
import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { RiQuillPenFill, RiDeleteBinLine } from "react-icons/ri";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import { SideBar, Header } from '../../components';

const User = () => {
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

    // fetch all user from colllection
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/user');
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
    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`/api/admin/user/${userId}`, {
                method: 'DELETE',
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_STUDENT', payload: userId });
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    // update course
    const handleUpdateUser = (rowId) => {
        navigate(`/user-update/${rowId}`);
    };

    return (
        <div className='student-page'>
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="student-heading">
                    <h3>Total Number of users: {students ? students.length : 0}</h3>
                    <Link to="/signup">
                        <div className="add-btn">
                            <span className="add-icon">+</span> Add User
                        </div>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {students &&
                            students.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user}</td>
                                    <td>{user.role}</td>
                                    <td className='student-field-action'>
                                        <RiQuillPenFill
                                            size={25}
                                            color="#FFB400"
                                            style={{ margin: '0px 1rem' }}
                                            onClick={() =>
                                                handleUpdateUser(user.user)}
                                        />
                                        <RiDeleteBinLine
                                            size={25}
                                            color='#F04445'
                                            onClick={() =>
                                                handleDeleteUser(user._id)}
                                        />
                                    </td>


                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User
