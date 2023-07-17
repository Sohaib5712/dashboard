/**
 * The ServiceCard component is a reusable React component that displays an icon, name, and detail for
 * a service.
 * @returns The ServiceCard component is returning a JSX element.
 */
import React from 'react'

const ServiceCard = ({icon, name, detail}) => {
    return (
        <div className="col-md-4">
            <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className={icon}></i>
                
            </span>
            <h4 className="my-3">{name}</h4>
            <p className="text-muted">{detail}</p>
        </div>
    )
}

export default ServiceCard
