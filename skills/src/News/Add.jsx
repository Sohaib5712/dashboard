import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Add = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/news/getNews');
      setNews(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

//   const truncateText = (text, maxLength) => {
//     if (text.length <= maxLength) {
//       return text;
//     }
//     return text.substr(0, maxLength) + '...';
//   };

return (
  <div>
    <h1 className="text-center mb-5">News</h1>
      {news.length === 0 ? (
        <p className="text-center">No blogs found</p>
      ) : (
        <div className="container">
          <div className="row">
            {news.map((v, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={i}>
              <div className="card" style={{ width: '100%' }}>
                <div className="card-body">
                  <div className="d-flex">
                    <h5 className="card-title">{v.title}</h5>
                    </div>
                    <div style={{ marginLeft: '3rem', fontSize: '1.1rem' }}>
                    <marquee>
                    {v.desc} 
                  </marquee>
                    </div>
                  
                  <p className="card-text">
                    Published on {formatDate(v.createdAt)} 
                  </p>
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

export default Add;
