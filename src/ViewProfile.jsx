import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Suggestions from './Suggestions';
import { useContext } from 'react';
import { Appcontext } from './Appcontext';
import Sidebar from './Sidebar';
import Followers from './Followers';
import Following from './Following';


function ViewProfile() {
  const { toggle } = useContext(Appcontext);
  const [Refresh,setRefresh]=useState(false);
  const [showFollowers,setshowFollowers]=useState(false);
  const [showFollowing,setshowFollowing]=useState(false);

  const [user,setUser] = useState();
  const { id } = useParams();
     
  useEffect(() => {
    fetch(`http://localhost:8000/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log(err))
  }, [id,Refresh])



  return (
  <>
      <div className='d-flex w-100 gap-3 p-3'>
        <div className='w-20'>
          <Sidebar  />
        </div>
  
    <div className=' border border-2 m-3 rounded p-5'>
        {user ? (
          <div className='d-flex flex-column '>
            
            <div className='d-flex'>
              <div>
                <img className='profile rounded-circle' src={user.profilePic} />
                <h4>{user.username}</h4>
                <p>{user.fullName}</p>
                <p style={{width:"250px"}}>
                  <b>Bio</b><br />{user.bio}
                </p>
              </div>
            
              <div className='d-flex'>
                <p className='mt-5 p-1 fs-5'>{user.posts.length} <br />posts</p>  
                <p className='mt-5 p-1 fs-5' onClick={()=>{setshowFollowers(true); setshowFollowing(false)}}>{user.followers.length}  <br />followers</p>
                <p className='mt-5 p-1 fs-5' onClick={()=>{setshowFollowers(false); setshowFollowing(true)}}>{user.following.length} <br />following</p>
              </div>
            </div> 

            <div>
              <p className= {` m-3 p-1 f btn${user.followers.includes(1)? " btn-light" : " btn-primary"} ` } onClick={async () => {
            await toggle(user.id);
            setRefresh(r => !r);
          }}> {user.followers.includes(1)?"Following":"Follow"}</p>
          <p className='btn btn-primary m-3 p-1 f'> Message</p>
            </div>
            
          </div>
          
          
        
        ) : "loading..."}
        </div>
        <div className='w-25'>
          {
            showFollowers && <Followers id={user.id}/>
          }
          { showFollowing && <Following id={user.id}/>}
        </div>
      </div>
    
  </>)
}

export default ViewProfile;
