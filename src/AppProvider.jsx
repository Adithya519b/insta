import React, { useState } from "react";
import axios from "axios";
import { Appcontext } from "./Appcontext";

function AppProvider({ children }) {
  const [message, setMessage] = useState("Hello from Context!");

  // ID of currently logged-in user (example: 1)
  const myId = 1;

  async function toggle(id) {
    try {
      // 1. Get user data
      const res = await axios.get(`http://localhost:8000/users/${id}`);
      const user = res.data;

      // 2. Check if already following
      const isFollowing = user.followers.includes(myId);

      let updatedUser;

      if (isFollowing) {
        updatedUser = {
          ...user,
          followers: user.followers.filter(f => f !== myId)
        };
        console.log("Unfollowed:", id);
      } else {
        updatedUser = {
          ...user,
          followers: [...user.followers, myId]
        };
        console.log("Followed:", id);
      }

      // 3. Update DB
      await axios.patch(
        `http://localhost:8000/users/${id}`,
        updatedUser
      );

      // 4. Update context message
      setMessage(`You toggled follow for user ${id}`);

    } catch (err) {
      console.error("Toggle failed:", err);
    }
  }

  const value = {
    message,
    toggle
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
}

export default AppProvider;
