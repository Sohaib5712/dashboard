/**
 * The Course component is a React component that renders a section with a heading and subheading, and
 * a row of CourseCard components displaying different course offerings.
 * @returns The Course component is returning a section element with a className of "page-section
 * bg-light" and an id of "portfolio". Inside the section, there is a container div with a text-center
 * class. Inside the container div, there is a heading element with a className of "section-heading
 * text-uppercase" and the text "Course Offer". There is also a subheading element with a className of
 * "section
 */
import React from 'react'
import { CourseCard } from '../components';
import digital from '../course/Digital-M.jpg';
import python from '../course/python.jpg';
import ui from '../course/ui.jpg';
import web from '../course/web.jpg';
const Course = () => {
    return (
        <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Course Offer</h2>
                    <h3 className="section-subheading text-muted">We Offer Different Course in Every Field</h3>
                </div>
                <div className="row">
                    <CourseCard img={digital} name={'Digital Marketing'}/>
                    <CourseCard img={ui} name={'Ui/Ux Design'} />
                    <CourseCard img={python} name={'Python Development'} />
                    <CourseCard img={web} name={'WebSite Development'} />
                    

                </div>
            </div>
        </section>
    )
}

export default Course
