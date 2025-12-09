import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { Appcontext } from "./Appcontext";





function Suggestions() {
    const [Profile,setProfile]=useState([])
    const [Suggestions,setSuggestions]=useState([])
    const [Refresh,setRefresh]=useState(false);
    const { message, toggle } = useContext(Appcontext);

    const navigate=useNavigate();
       useEffect(() => {
  fetch("http://localhost:8000/profile")
    .then(res => res.json())
    .then(data => setProfile(data))
    .catch(err => console.error(err));
  fetch("http://localhost:8000/users")
    .then(res => res.json())
    .then(data => setSuggestions(data))
    .catch(err=>console.log(err));

}, [Refresh]);
  return (
    <div className='border-left-1'>
      
     <div className='d-flex flex-column w-75  p-3 m-3 gap-3'>
        <div className='d-flex p-3 bg-light rounded-2'>
            <img  className="postprofile" src={Profile.profilePic} alt="profilepic" />
            <p className=' d-flex p-3'>{Profile.username} </p> <p className='ms-auto p-3 text-primary'>Switch</p>
        </div>
        <div className='d-flex'>suggestions <b className=' ms-auto '>See All</b></div>
        <div className=''>
        {Suggestions.map((suggestion)=>(
            <div className='d-flex m-1' key={suggestion.id}>
                <img className="postprofile" src={suggestion.profilePic} alt="profilepic" onClick={()=> navigate(`/viewProfile/${suggestion.id}`)}/>
                <p className='p-2'>{suggestion.username}</p>
                <p className= {` ms-auto p-1 f btn${suggestion.followers.includes(1)? " btn-light" : " btn-primary"} ` }  onClick={async ()=>{await toggle(suggestion.id);
                  setRefresh(f=>!f)
                }}> {suggestion.followers.includes(1)?"Following":"Follow"}</p>
            </div>

        )
            
        )}
         

        </div>
     </div>
    </div>
  )
}

export default Suggestions