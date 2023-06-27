import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';

const UpdateRole = () => {
    const [userRole, setUserRole] = useState([]);
    const { user } = useAuthContext();

    const { id } = useParams();
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    
    // Fetch user data and set user role
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.user) {
                    const response = await fetch(
                        `http://localhost:4000/api/admin/user/${user.user}`
                    );
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

    // fetch single role
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/role/${id}`);
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    setRole(data.role);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching User record:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setRole((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/admin/role/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(role),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/role');

            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating Student record:', error);
        }
    };

    return (
        <div className="student-page">
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className='add-form-page'>
                    {role ? (

                        <div className="add-form">
                            <h1>Enter Role Info</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="User">User Role</label>
                                        <input
                                            type="text"
                                            id='User'
                                            name="user_roll"
                                            placeholder='User Name'
                                            onChange={handleChange}
                                            value={role.user_roll}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className='add-btn'>Save</button>
                            </form>
                        </div>
                    ) : (<p>Loading...</p>)}

                </div>
            </div>
        </div>
    );
};

export default UpdateRole;

