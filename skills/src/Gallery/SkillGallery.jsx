import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillGallery = () => {
  const [gallery, setGallery] = useState([]);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/news/getImages');
      setGallery(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => { fetchGallery() }, []);

  return (
    <div>
      <h1 className="text-center mb-5">Gallery</h1>
      {gallery.length === 0 ? (
        <p className="text-center">No image found</p>
      ) : (
        <div className="container">
          <div className="row">
            {gallery.map((v, i) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={i}>
                <div className="card" style={{ width: '70%',height:"10%" }}>
                    <img
                      src={`http://localhost:4000/${v.image}`}
                      className="card-img-top w-100"
                      alt="..."
                    />&nbsp;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGallery;
