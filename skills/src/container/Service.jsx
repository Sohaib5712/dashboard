/* The code is defining a React functional component called `Service`. */
import React from 'react';
import {ServiceCard} from '../components'

const Service = () => {
    return (
        <section className="page-section" id="services">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <div className="row text-center">
                    <ServiceCard icon={'fas fa-arrow-trend-up fa-stack-1x fa-inverse'} name={'Trading'} detail={'trading details...'}/>
                    <ServiceCard icon={'fas fa-code fa-stack-1x fa-inverse'} name={'Coding'} detail={'Coding details...'} />
                    <ServiceCard icon={'fas fa-rectangle-ad fa-stack-1x fa-inverse'} name={'Digital Marketing'} detail={'Digital Marketing details...'} />
                </div>
            </div>
        </section>
    )
}

export default Service
