import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom'
const Blogsdetail = () => {
    const {id} = useParams()
    const [blogDetail,setBlogDetail]=useState([])
    const fetchsingleBlog = async () =>{
        await axios.
        get(`http://localhost:4000/api/blog/blog/${id}`)
        .then((res)=>{setBlogDetail(res.data)})
        .catch((err)=>{console.log(err)})
    }
    useEffect(()=>{fetchsingleBlog()},[])

    
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#"></a>
  </nav>

  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <article>
          <header>
            <h1 class="blog-title" style={{textTransform:'uppercase'}}>{blogDetail.title}</h1>  
            <div style={{textAlign:"center"}}>
               <img style={{width:"30rem",height:'25rem'}} src={`http://localhost:4000/${blogDetail.image}`} alt="" />
            </div>
            <p class="blog-meta">Published on {formatDate(blogDetail.createdAt)} by {blogDetail.writerName}</p>
          </header>
          <div class="blog-body">
            <p class="lead" style={{fontSize:'1.4rem',fontWeight:'bold'}}>{blogDetail.smallDesc}</p>
            <p class="lead">{blogDetail.fullDesc}</p>
          </div>
          <footer>
            <div class="blog-tags">
              <span class="badge badge-secondary">Tag1</span>
              <span class="badge badge-secondary">Tag2</span>
              <span class="badge badge-secondary">Tag3</span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </div>
  <div style={{textAlign:'right',marginRight:"10rem`"}}>
    <Link to="/" className='btn btn-warning'>
      Explore More...
    </Link>
  </div>

 <footer class="footer mt-3 mb-2">
    <div class="container text-center">
      <span class="text-muted">© 2023 Blog. All rights reserved.</span>
    </div>
  </footer>

  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>


    </>
  )
}

export default Blogsdetail
