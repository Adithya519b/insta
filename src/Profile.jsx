import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Followers from './Followers';
import Following from './Following';
function Profile() {
  const [profile,setprofile]=useState(null);
  const [showFollowers,setshowFollowers]=useState(false);
  const [showFollowing,setshowFollowing]=useState(false);
   useEffect(()=>{
    axios.get('http://localhost:8000/profile')
    .then(res=> setprofile(res.data))
    .catch(err => console.log(err));
     
   },[])
   function handleOnChange(e){
      setprofile(prev =>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }
    const handleUpdate= async() =>{
      axios.put('http://localhost:8000/profile',profile)
      .then(console.log("profile updated"))
      .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex gap-3 w-100'>
    <div className='w-20'>
       <Sidebar/></div> 
       <div  className='d-flex flex-column justify-content-center align-items-center p-3 m-3  border border-2  rounded'>
      {profile?
      <> <div className='d-flex'>
         <div>
           <img className='profile rounded-circle' src={profile.profilePic} alt="profile pic"  />
        <h4>{profile.username}</h4>
        <p>{profile.fullName}</p>
        <p style={{width:"300px"}}><b>Bio</b> <br />{profile.bio}</p>
         </div>
       
        <div className='d-flex '>
          <p className='mt-5 p-2 fs-5 pi'>{profile.posts.length} <br />posts</p>  
          <div className='mt-5 p-2 fs-5 pi' onClick={()=>{<div className='ms-auto'>{ console.log("clicked")}{setshowFollowers(true)} {setshowFollowing(false)}</div>}}>{profile.followers.length} <br />followers</div>
          <div className='mt-5 p-2 fs-5 pi' onClick={()=>{<div className='ms-auto'>{ console.log("clicked")}{setshowFollowers(false)}{setshowFollowing(true)} </div>}}>{profile.following.length} <br />following</div>
        </div>
      </div>
      <div className='m-3 w-50'>
        <input 
        className="form-control m-2"
        type="text" 
        name='username'
        value={profile.username} 
        onChange={handleOnChange}/>
        
        <input type="text"
        className='form-control m-2'
        name='fullName'
        value={profile.fullName}
        onChange={handleOnChange} />

        <input type="text"
        className='form-control m-2' 
        name='bio'
        value={profile.bio}
        onChange={handleOnChange} />
        
        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
        </div>
        </>
      :
      <div>
        <h4>Something Wrong 🙁</h4>
      </div>
    }
    </div>
          {showFollowers &&
          <Followers id={profile.id}/>}
          
          {showFollowing &&
          <Following id={profile.id}/>}</div>
  )
}

export default Profile