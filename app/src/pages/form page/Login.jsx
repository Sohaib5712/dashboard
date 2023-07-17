import { useState } from 'react';
import { useLogin } from './useLogin'
import './userform.css';

const Login = () => {
    const [user, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isloading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(user, password)
    }

    return (
        <div className='userform'>
            <form onSubmit={handleSubmit}>
                <h3>Login Form</h3>
                <div className="user-field">
                    <label htmlFor="username">User Name</label>
                    <input type="text" placeholder='Fenix'
                        onChange={(e) => setUsername(e.target.value)}
                        value={user}
                    />
                </div>
                <div className="user-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                
                <center>
                    <button disabled={isloading}>Login</button>
                </center>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default Login;
