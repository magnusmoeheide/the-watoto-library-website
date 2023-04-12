import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out successful");
      })
      .catch((error) => console.log(error));
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: username,
    });
    console.log(authUser);
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignout}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}

      <form onSubmit={handleNameChange}>
        <label>Change name</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <button>Save</button>
      </form>
    </div>
  );
};

export default AuthDetails;
