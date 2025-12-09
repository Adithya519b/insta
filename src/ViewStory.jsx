import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id > tot || id <= 0) {
      navigate('/');
      return;
    }
  }, [id, tot, navigate]);

  useEffect(() => {
    fetch(`http://localhost:8000/stories/${id}`)
      .then(res => res.json())
      .then(data => setStory(data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className='bg-secondary'>
      {story ? (
        <div className='d-flex align-items-center vh-100 justify-content-center'>
          
          {/* Left Navigation */}
          <Link to={`/stories/${Number(id) - 1}/${tot}`}>
            <p className='btn btn-light m-3 fs-2'>
              <i className="bi bi-caret-left"></i>
            </p>
          </Link>

          {/* Story Content */}
          <div>
            <div className='d-flex position-fixed p-2'>
              <img className="postprofile" src={story.profilePic} alt="profile" onClick={()=>navigate(`/viewProfile/${story.userId}`)} />
              <h3 className='p-2 text-white'>{story.username}</h3>
            </div>

            <img className="vh-100" src={story.image} alt="Story" style={{ width: "500px" }} />
          </div>

          {/* Right Navigation */}
          <Link to={`/stories/${Number(id) + 1}/${tot}`}>
            <p className='btn btn-light m-3 fs-2'>
              <i className="bi bi-caret-right"></i>
            </p>
          </Link>

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ViewStory;
