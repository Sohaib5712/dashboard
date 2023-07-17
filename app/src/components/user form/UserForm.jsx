import { useState } from 'react';
import './userform.css';

const UserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const roleOption = [
        'admin',
        'query operator',
        'call status',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password, role)
    }

    return (
        <div className='userform'>
            <form onSubmit={handleSubmit}>
                <h3>Login Form</h3>
                <div className="user-field">
                    <label htmlFor="username">User Name</label>
                    <input type="text" placeholder='Fenix'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className="user-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="user-field">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                    >
                        <option value="">Role</option>
                        {roleOption.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <center>
                    <button>Login</button>
                </center>
            </form>
        </div>
    );
};

export default UserForm;
