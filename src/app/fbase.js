import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import api from "./api";

const firebaseConfig = {
  apiKey: "AIzaSyDgfLEWgyimBkQxWP69-4stlJI7lhlsa4s",
  authDomain: "quorac-54962.firebaseapp.com",
  projectId: "quorac-54962",
  storageBucket: "quorac-54962.appspot.com",
  messagingSenderId: "577326349845",
  appId: "1:577326349845:web:2a3f20b9bd3aa9d9e5d81c",
  measurementId: "G-QC4W3YPR5P",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const _signInApplication = async (currentUser, hard=true) => {
  if (!hard) {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      return;
    }
  }

  const idToken = await currentUser.getIdToken();
  const headers = {};
  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
    headers["x-social"] = "true";
  }

  const response = await api.post("/auth/login", {}, { headers });
  const localToken = response.data.access_token;
  return await new Promise((resolve) => {
    localStorage.setItem("token", localToken);
    resolve();
  });
};

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    await _signInApplication(auth.currentUser);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    await _signInApplication(auth.currentUser);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    await _signInApplication(auth.currentUser);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  localStorage.removeItem("token");
  await auth.signOut();
};

const useApplicationAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [firebaseUser, firebaseLoading, error] = useAuthState(auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (firebaseLoading) {
      return;
    }

    if (firebaseUser) {
      _signInApplication(firebaseUser, false).then(() => {
        setIsAuthenticated(true);
        setUser(firebaseUser);
      });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, [firebaseUser, firebaseLoading]);

  return [
    user,
    isAuthenticated,
    loading,
    error,
  ];
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  useApplicationAuth,
};
