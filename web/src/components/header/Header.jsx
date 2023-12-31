/* This is a React component called `SideBar` that renders a sidebar navigation menu. It imports React,
`Link` component from `react-router-dom`, and a custom hook `useLogout` from
`../../hooks/useLogout`. It also imports a CSS file `sidebar.css`. */
/* This is a React component called `Header` that displays a navigation bar with a menu icon that
toggles a sidebar when clicked. The sidebar contains links to different pages depending on the
user's role, and a logout button. The component uses several hooks and imports from external files
to handle authentication and logout functionality. */
import React, { useState } from 'react';
import './header.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useLogout } from '../../hooks/useLogout';

const Header = ({ role }) => {
    const { logout } = useLogout();
    const [showSidebar, setShowSidebar] = useState(false);
    const { user } = useAuthContext();

    const handleClickLogout = () => {
        logout();
    };


    return (
        <div className='header px-5 py-2'>
            {showSidebar
                ? <RiCloseLine color="#fff" className='menu-icon' size={27} onClick={() => setShowSidebar(false)} />
                : <RiMenu3Line color="#fff" className='menu-icon' size={27} onClick={() => setShowSidebar(true)} />}
            {showSidebar && (
                <div className="header-sidebar">
                    <ul>
                        <h3>Skills Institute</h3>
                        <Link to="/">
                            <li>DashBoard</li>
                        </Link>
                        <div className="line"></div>
                        <Link to="/">
                            <li>Student</li>
                        </Link>
                        <div className="line"></div>
                        <Link to="/reg-student">
                            <li>Reg Student </li>
                        </Link>
                        <div className="line"></div>
                        {role === "admin" && (
                            <>
                                <Link to="/course">
                                    <li>Available course</li>
                                </Link>
                                <div className="line"></div>
                                <Link to="/user">
                                    <li>User's</li>
                                </Link>
                                <div className="line"></div>
                                <Link to="/role">
                                    <li>Add Role</li>
                                </Link>
                                <div className="line"></div>
                            </>
                        )}
                        {role === "query operator" && (
                            <>
                                <Link to="/course">
                                    <li>Available course</li>
                                </Link>
                                <div className="line"></div>
                            </>
                        )}

                        <li onClick={handleClickLogout}>Logout</li>
                    </ul>
                </div>
            )}

            <div className="header-content">
                {user?.user} / {role}
            </div>
        </div>
    );
};

export default Header;
