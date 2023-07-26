import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/faculty/getFaculty');
      setFaculty(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  
  return (
    <div>
      <h1 className="text-center mb-5">Blogs</h1>
      {faculty.length === 0 ? (
        <p className="text-center">No blogs found</p>
      ) : (
        <div className="container">
          <div className="row">
            {faculty.map((v, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={i}>
                <div className="card" style={{ width: '100%' }}>
                  {/* <Link to={`/blog_details/${v._id}`}> */}
                    <img src={`http://localhost:4000/${v.image}`}
                         className="card-img-top w-100"
                         alt="..."
                    />
                  {/* </Link> */}
                  <div className="card-body">
                    <div className="d-flex">
                      <h5 className="card-title">{v.name}</h5>
                      
                    </div>
                    <p className="card-text">{(v.design)}</p>
                     </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty;
