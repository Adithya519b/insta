import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from './Likes';
import axios from 'axios';
import { toast } from 'react-toastify';

function Posts() {
  const [Posts, setPosts] = useState([]);
  const [Users, setUsers] = useState([]);
  const [showLikes, setShowLikes] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch posts
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));

    // fetch users
    fetch("http://localhost:8000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));

  }, []);

  // merge posts + users
  const mergedPosts = Posts.map(post => {
    const user = Users.find(u => Number(u.id) === post.userId);

    return {
      ...post,
      username: user?.username || "Unknown",
      profilePic: user?.profilePic
    };
  });

  // -----------------------------
  // 👍 FIXED LIKE HANDLER
  // -----------------------------
  function handleLike(postId) {
     const userId = 1;  // your logged user id
    toast.success("like ❤️ updated",{autoClose:1500})
  setPosts(prev =>
    prev.map(post => {
      if (post.id !== postId) return post;

      const alreadyLiked = post.likes.includes(userId);

      const newLikes = alreadyLiked
        ? post.likes.filter(id => id !== userId)
        : [...post.likes, userId];

      // 🔥 Update JSON DB
      updatelikes(postId, newLikes);

      return { ...post, likes: newLikes };
    })
  );
  }
  async function updatelikes(postid,updatedlikes){
    try{
      await axios.patch(`http://localhost:8000/posts/${postid}`,{likes :updatedlikes})
    }
    catch(err )
    {console.log("error while updating likes ",err)
  }}

  return (
    <div className='postcard M-3'>
      {mergedPosts.map((post) => (
        <div className="post" key={post.id}>
          
          <div className='d-flex'>
            <img
              className="postprofile"
              src={post.profilePic}
              alt="profile"
              onClick={() => navigate(`/viewProfile/${post.userId}`)}
            />
            <h5 className='mt1 p-3'>{post.username}</h5>
          </div>

          <img className='postimg' src={post.image} alt={post.image} />

          <div className='fs-4'>
            <strong className='text-danger'>
              <i
                className={post.likes.includes(1) ? "bi bi-heart-fill" : "bi bi-heart"}
                onClick={() => handleLike(post.id)}
              ></i>
            </strong>
            <b><i className="bi bi-chat-left"></i></b>
            <b><i className="bi bi-send"></i></b>
          </div>

          <b className='M-2' onClick={() => setShowLikes(post.id)}>
            {post.likes.length} likes
          </b>

          <p>{post.caption}</p>

          <div>
            {showLikes === post.id && <Likes likeids={post.likes} />}
          </div>

        </div>
      ))}
    </div>
  );
}

export default Posts;
