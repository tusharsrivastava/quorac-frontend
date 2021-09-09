import { auth, logout } from "../../app/fbase";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Logout = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading){
      return;
    }
    if (user || error) {
      logout();
      history.push("/");
    }
  }, [user, loading, error, history]);

  return <div>Logging Out....</div>;
}

export default Logout;
