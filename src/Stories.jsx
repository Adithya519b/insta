import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [Storys, setStory] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetch("/insta/db.json")
      .then(res => res.json())
      .then(data => {
        console.log(data.Stories);
        setStory(data.Stories);  // <-- save to state
      })
      .catch(err => console.error(err));
  }, []);  // <-- important!!
  let tot=0;
  return (
    
    <div className='stories'>
     <div className='d-none'> {tot=Storys.length}</div> 
      {Storys.length >0 ?(Storys.map((story) => (
        <div className="story" key={story.id} onClick={()=>{navigate(`/stories/${story.id}/${tot}`)}}>
          <img  className='img' src={story.profilePic} alt="profile" />
          <p className='text-truncate ' style={{width:"70px"}}>{story.username}</p>
        </div>
      ))): ( <p>loading...</p> )}
    </div>
  );
}

export default Stories;
