import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Following({id}) {
  const [users,setusers]=useState([]);
  const [followings,setfollowings]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:8000/users')
    .then(res=> res.json())
    .then(data=> setusers(data))
    .then(err=>console.log(err));
    console.log(users);
    console.log(id,"id")
   
    
  },[])
  useEffect(()=>{
    
    if(users.length>0){
      setfollowings(users[id-1].following);
  
}

},[users])
    console.log("enter followers")
  console.log(followings);

return (
  <div className="d-flex flex-column border border-1 p-3 m-3 rounded bg-secondary text-light">
    Following
    {followings.map((followerId) => (
      <div key={followerId} className='d-flex m-3 align-items-center'>
        <img 
          src={users[followerId]?.profilePic} 
          alt="profilepic" 
          
          className='postprofile'
        />
        <p className='m-1 fs-5'>{users[followerId]?.username}</p>
      </div>
    ))}
  </div>
);

}

export default Following