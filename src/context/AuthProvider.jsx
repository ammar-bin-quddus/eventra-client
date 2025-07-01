/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  useEffect(() => {
    // Watch for changes to the Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Request a JWT from the server using the user's email
          const res = await axios.post("http://localhost:5000/api/auth/login", {
            email: currentUser?.email,
          });

          // Save token locally and update state
          if (res.data?.token) {
            localStorage.setItem("token", res.data.token);
          }
        } catch (err) {
          console.error("Failed to get JWT token:", err.message);
        }
      } else {
        // User is signed out — clean up
        localStorage.removeItem("token");
      }

      // Done loading either way
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    handleRegister,
    handleLogin,
    handleLogOut,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
