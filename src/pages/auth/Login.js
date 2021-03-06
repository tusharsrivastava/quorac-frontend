import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useApplicationAuth, signInWithEmailAndPassword, signInWithGoogle } from "../../app/fbase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, isAuthenticated, loading, error] = useApplicationAuth();
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (isAuthenticated) history.replace("/");
  }, [isAuthenticated, loading, history]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/auth/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/auth/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
