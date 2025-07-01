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
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      try {
        if (currentUser) {
          const { data } = await axios.post(
            "http://localhost:5000/api/auth/login",
            { email: currentUser?.email }
          );
          localStorage.setItem("token", data?.token);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
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
