import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Myblog = () => {
  const [blog, setBlog] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/blog/blogData');
      setBlog(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div>
      <h1 className="text-center mb-5">Blogs</h1>
      {blog.length === 0 ? (
        <p className="text-center">No blogs found</p>
      ) : (
        <div className="container">
          <div className="row">
            {blog.map((v, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={i}>
                <div className="card" style={{ width: '100%' }}>
                  <Link to={`/blog_details/${v._id}`}>
                    <img
                      src={`http://localhost:4000/${v.image}`}
                      className="card-img-top w-100"
                      alt="..."
                    />
                  </Link>
                  <div className="card-body">
                    <div className="d-flex">
                      <h5 className="card-title">{v.title}</h5>
                      <h6 style={{ marginLeft: '3rem', fontSize: '1.5rem' }}>
                        {truncateText(v.smallDesc, 10)}
                      </h6>
                    </div>
                    <p className="card-text">{truncateText(v.fullDesc, 10)}</p>
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

export default Myblog;
