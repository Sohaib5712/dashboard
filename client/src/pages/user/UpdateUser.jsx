import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';

const UpdateUser = () => {
    const { id } = useParams();
    const [User, setUser] = useState(null);
    const [role, setRole] = useState(null)
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState([]);
    const { user } = useAuthContext();

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

    // fetch role from collection
    useEffect(() => {
        const fetchRoles = async () => {
            const response = await fetch('http://localhost:4000/api/admin/role');
            const json = await response.json();
            if (response.ok) {
                setRole(json);
            }
        };
        fetchRoles();
    }, []);
    // fetch single userrr
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/user/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setUser(data.users);
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
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(User),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/user');

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
                    {User ? (

                        <div className="add-form">
                            <h1>Enter User Info</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-field">
                                        <label htmlFor="User">Name</label>
                                        <input
                                            type="text"
                                            id='User'
                                            name="user"
                                            placeholder='User Name'
                                            onChange={handleChange}
                                            value={User.user}
                                        />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="gender">Gender</label>
                                    <select
                                        id="gender"
                                        onChange={handleChange}
                                        value={User.role}
                                        name='role'
                                    >
                                        <option value="">Role</option>
                                        {role &&
                                            role.map((user) => (
                                                <option key={user._id} value={user.user_roll}>{user.user_roll}</option>
                                            ))}
                                    </select>

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

export default UpdateUser;

