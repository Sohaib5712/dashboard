/* This is a React component called `Role` that displays a table of roles fetched from a server. It
uses various React hooks such as `useEffect` and `useState` to manage state and fetch data. It also
uses the `useAuthContext` and `useWorkoutsContext` custom hooks to access authentication and workout
data respectively. The component also has functions to handle deleting and updating roles. Finally,
it renders a table with the role data and buttons to add, update, and delete roles. */
import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { SideBar, Header } from '../../components';
import { useAuthContext } from "../../hooks/useAuthContext";
import { RiQuillPenFill, RiDeleteBinLine } from "react-icons/ri";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";

const Role = () => {
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

// fetch all role from collection

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/role');
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
                const response = await fetch(`/api/admin/role/${userId}`, {
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
            navigate(`/role-update/${rowId}`);
        };

    return (
        <div className='student-page'>
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="student-heading">
                    <h3>Total Number of Role: {students ? students.length : 0}</h3>
                    <Link to="/addrole">
                        <div className="add-btn">
                            <span className="add-icon">+</span> Add Role
                        </div>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Role</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {students &&
                            students.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user_roll}</td>
                                    <td className='student-field-action'>
                                        <RiQuillPenFill
                                            size={25}
                                            color="#FFB400"
                                            style={{ margin: '0px 1rem' }}
                                            onClick={() =>
                                                handleUpdateUser(user._id)}
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

export default Role
