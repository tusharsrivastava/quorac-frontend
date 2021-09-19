import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useApplicationAuth, sendPasswordResetEmail } from "../../app/fbase";


function Reset() {
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, isAuthenticated, loading, error] = useApplicationAuth();
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) history.replace("/");
  }, [isAuthenticated, loading, history]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/auth/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;
