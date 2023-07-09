/* This is a React component called `SideBar` that renders a sidebar navigation menu. It imports React,
`Link` component from `react-router-dom`, and a custom hook `useLogout` from
`../../hooks/useLogout`. It also imports a CSS file `sidebar.css`. */
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
                <Link to="/">
                    <li>
                        Dashboard
                    </li>
                </Link>
                <hr className="sidebar-line" />
                <Link to="/">
                    <li>
                        Student
                    </li>
                </Link>
                <hr className="sidebar-line" />
                <Link to="/reg-student">
                    <li>
                        Reg Student
                    </li>
                </Link>
                <hr className="sidebar-line" />
                {role === 'admin' && (
                    <>
                        <Link to="/course">
                            <li>
                                Available course
                            </li>
                        </Link>
                        <hr className="sidebar-line" />
                        <Link to="/user">
                            <li>
                                User's
                            </li>
                        </Link>
                        <hr className="sidebar-line" />
                        <Link to="/role">
                            <li>
                                Add Role
                            </li>
                        </Link>
                        <hr className="sidebar-line" />
                    </>
                )}
                {role === 'query operator' && (
                    <>
                        <Link to="/course">
                            <li>
                                Available course
                            </li>
                        </Link>
                        <hr className="sidebar-line" />
                    </>
                )}
                <li onClick={handleClickLogout}>Logout</li>
            </ul>
        </div>
    );
};

export default SideBar;
