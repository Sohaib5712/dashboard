/* The code is defining a React functional component called `Gallery`. */
import React, { useState } from 'react';

const Gallery = () => {
    const [filter, setFilter] = useState('all');

    const images = [
        // for class
        { category: 'ClassRoom', src: 'class-1.jpg', alt: 'ClassRoom 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        { category: 'ClassRoom', src: 'class-2.jpg', alt: 'ClassRoom 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        // for tour
        { category: 'Trip', src: 'tour-1.jpg', alt: 'Trip 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        { category: 'Trip', src: 'tour-2.jpg', alt: 'Trip 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        { category: 'Trip', src: 'tour-3.jpg', alt: 'Trip 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        // for function
        { category: 'Function', src: 'function-1.jpg', alt: 'Function 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        { category: 'Function', src: 'function-2.jpg', alt: 'Function 1', description: 'Lorem ipsum, dolor sit amet consectetur' },
        
        // Add more images with their respective category, source, alt, and description
    ];

    const handleFilterChange = (category) => {
        setFilter(category);
    };

    const filteredImages = filter === 'all' ? images : images.filter((image) => image.category === filter);

    return (
        <section id="gallery" className="gallery">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2>Gallery</h2>
                </div>

                <div className="gallery-filter text-center mb-5">
                    <ul className="nav nav-pills justify-content-center">
                        <li className={`nav-item ${filter === 'all' ? 'active' : ''}`}>
                            <button className="nav-link" onClick={() => handleFilterChange('all')}>
                                All
                            </button>
                        </li>
                        <li className={`nav-item ${filter === 'ClassRoom' ? 'active' : ''}`}>
                            <button className="nav-link" onClick={() => handleFilterChange('ClassRoom')}>
                                Class Room
                            </button>
                        </li>
                        <li className={`nav-item ${filter === 'Trip' ? 'active' : ''}`}>
                            <button className="nav-link" onClick={() => handleFilterChange('Trip')}>
                                Tour
                            </button>
                        </li>
                        <li className={`nav-item ${filter === 'Function' ? 'active' : ''}`}>
                            <button className="nav-link" onClick={() => handleFilterChange('Function')}>
                                Ceremony
                            </button>
                        </li>
                        
                    </ul>
                </div>

                <div className="gallery-container row">
                    {filteredImages.map((image, index) => (
                        <div className="gallery-item col-md-4" key={index}>
                            <img
                                src={process.env.PUBLIC_URL + '/assets/images/' + image.src}
                                alt={image.alt}
                                className="img-fluid"
                            />
                            <div className="gallery-overlay">
                                <h4>{image.alt}</h4>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
};

export default Gallery;
