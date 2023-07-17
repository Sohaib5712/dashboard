/* This is a React component called `Signup` that allows a user to enter their username, password, and
role. It also fetches a list of roles from an API endpoint and displays them in a dropdown menu.
When the user submits the form, it sends a POST request to another API endpoint to create a new user
with the entered data. If the request is successful, it clears the form and navigates to the `/user`
page. If there is an error, it displays an error message. The component also includes a sidebar and
some CSS styling. */
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import './userform.css';

import { SideBar } from '../../components'

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await fetch('http://localhost:4000/api/admin/role');
            const json = await response.json();
            if (response.ok) {
                setUsers(json);
            }
        };
        fetchRoles();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { user, password, role }
        const response = await fetch('http://localhost:4000/api/admin/signup', {
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
            setUsername('')
            setPassword('')
            setRole('')
            setError('')
            navigate('/user');
            

        }
    }

    return (
        <div className='add-form-page'>
            <SideBar />
            <div className="add-form">
                <h1>Enter User Data</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="username">User Name</label>
                        <input type="text" placeholder='Fenix'
                            onChange={(e) => setUsername(e.target.value)}
                            value={user}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='********'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                        >
                            <option value="">Role</option>
                            {users &&
                            users.map((user) => (
                                <option key={user._id} value={user.user_roll}>{user.user_roll}</option>
                            ))}
                        </select>

                    </div>


                    <button type="submit" className='add-btn'>Save</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>

        </div>
    );
};

export default Signup;
