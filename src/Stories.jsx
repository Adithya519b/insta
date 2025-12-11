import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [Storys, setStory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const base = process.env.NODE_ENV === "production" ? "/insta/" : "/";

    fetch(base + "db.json")
      .then(res => res.json())
      .then(data => {
        console.log(data.stories);
        setStory(data.stories);  // <-- FIX HERE
      })
      .catch(err => console.error(err));

  }, []);

  let tot = Storys.length;

  return (
    <div className='stories'>
      {Storys.length > 0 ? (
        Storys.map((story) => (
          <div 
            className="story" 
            key={story.id} 
            onClick={() => navigate(`/stories/${story.id}/${tot}`)}
          >
            <img className='img' src={story.profilePic} alt="profile" />
            <p className='text-truncate' style={{ width: "70px" }}>
              {story.username}
            </p>
          </div>
        ))
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default Stories;
