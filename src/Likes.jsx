import React, { useEffect, useState } from "react";

function Likes({ likeids }) {
  const [users, setusers] = useState([]);
  //const [posts, setPosts] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setusers(data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch posts
  console.log("likeids ",likeids)
 
 
  return (
    <div className="d-flex flex-column border border-1 p-3 m-3 rounded bg-secondary text-light">
  <h5>Likes</h5>

  {likeids.map(id => {
    const numericId = Number(id);
    const user = users.find(u => Number(u.id) === numericId);

    if (!user) return null;

    return (
      <div key={numericId} className="d-flex m-3 align-items-center">
        <img src={user.profilePic} alt="profile" className="postprofile" />
        <p className="m-1 fs-5">{user.username}</p>
      </div>
    );
  })}
</div>

  );
}

export default Likes;
