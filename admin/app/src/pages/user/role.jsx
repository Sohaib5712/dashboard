import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from "react-router-dom";

import { SideBar, Header } from '../../components';
import { useAuthContext } from "../../hooks/useAuthContext";

const Role = () => {
    const [users, setUsers] = useState(null);


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
        const fetchStudent = async () => {
            const response = await fetch('http://localhost:4000/api/admin/role');
            const json = await response.json();
            if (response.ok) {
                setUsers(json);
            }
        };
        fetchStudent();
    }, []);

    return (
        <div className='student-page'>
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="student-heading">
                    <h3>Total Number of users: {users ? users.length : 0}</h3>
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

                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user_roll}</td>


                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Role
