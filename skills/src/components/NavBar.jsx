/**
 * The above code is a functional component in JavaScript React that renders a navigation bar with
 * links to different sections of a website.
 * @returns The NavBar component is returning a navigation bar with a logo, menu button, and a list of
 * navigation links. The navigation bar is fixed at the top of the page. The color of the navigation
 * bar is determined by the "Color" prop passed to the component. The navigation links include links to
 * the home page ("/"), services section ("/#services"), course section ("/#portfolio"), about us
 * section ("/
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const NavBar = ({ Color }) => {
    const bgColor = {
        backgroundColor: Color
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style={bgColor}>
            <div className="container">
                <Link to="/" className='navbar-brand'>
                    <img src="assets/img/skills-logo.png" alt="..." style={{height:"50px"}} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <Link to="/" className='nav-link'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth to="/#services" className='nav-link'>
                                Services
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth to="/#portfolio" className='nav-link'>
                                Course
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth to="/#about" className='nav-link'>
                                About Us
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth to="/#contact" className='nav-link'>
                                Contact
                            </HashLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
