import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import './sidebar.css';

const SideBar = ({ role }) => {
    const { logout } = useLogout();

    const handleClickLogout = () => {
        logout();
    };

    return (
        <div className="sidebar">
            <ul className="list-unstyled">
                <h3 className="sidebar-heading m-3">Skills Institute</h3>
                <div className="sidebar-line"></div>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <hr className="sidebar-line" />
                <li>
                    <Link to="/">Student</Link>
                </li>
                <hr className="sidebar-line" />
                <li>
                    <Link to="/reg-student">Reg Student</Link>
                </li>
                <hr className="sidebar-line" />
                {role === 'admin' && (
                    <>
                        <li>
                            <Link to="/course">Available course</Link>
                        </li>
                        <hr className="sidebar-line" />
                        <li>
                            <Link to="/user">User's</Link>
                        </li>
                        <hr className="sidebar-line" />
                        <li>
                            <Link to="/role">Add Role</Link>
                        </li>
                        <hr className="sidebar-line" />
                    </>
                )}
                {role === 'query operator' && (
                    <>
                        <li>
                            <Link to="/course">Available course</Link>
                        </li>
                        <hr className="sidebar-line" />
                    </>
                )}
                <li onClick={handleClickLogout}>Logout</li>
            </ul>
        </div>
    );
};

export default SideBar;
