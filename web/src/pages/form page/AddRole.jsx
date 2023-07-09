/**
 * This is a React component that allows an admin user to add a new role to the system and saves it to
 * the backend.
 * @returns The component `AddRole` is being returned.
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './userform.css';

import { SideBar } from '../../components'
import { useAuthContext } from "../../hooks/useAuthContext";

const AddRole = () => {
    const navigate = useNavigate();
    const [user_roll, setRole] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);


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


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { user_roll }
        const response = await fetch('http://localhost:4000/api/admin/addrole', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setRole('')
            setError('')
            navigate('/role');


        }
    }

    return (
        <div className='add-form-page'>
            <SideBar role={userRole}/>
            <div className="add-form">
                <h1>Enter Role Data</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="username">Role:</label>
                        <input type="text" placeholder='Fenix'
                            onChange={(e) => setRole(e.target.value)}
                            value={user_roll}
                        />
                    </div>

                    <button className='add-btn'>Save</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>

        </div>
    );
};

export default AddRole;
