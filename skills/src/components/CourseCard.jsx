/**
 * The CourseCard component is a React component that renders a card with an image and name, and
 * includes a link to a course detail page.
 * @returns The CourseCard component is returning a JSX element.
 */
import React from 'react'
import { Link } from 'react-router-dom';

const CourseCard = ({ img, name }) => {
    return (
        <div className="col-lg-4 col-sm-6 mb-4">
            <div className="portfolio-item">
                <Link to="/course-detail" className='portfolio-link'>
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img className="img-fluid" src={img} alt="..." />
                </Link>
                <div className="portfolio-caption">
                    <div className="portfolio-caption-heading">{name}</div>
                    {/* <div className="portfolio-caption-subheading text-muted">Illustration</div> */}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
