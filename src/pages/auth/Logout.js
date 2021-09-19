import { logout, useApplicationAuth } from "../../app/fbase";
import { useHistory } from "react-router";
import { useEffect } from "react";

const Logout = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [user, isAuthenticated, loading, error] = useApplicationAuth();
  const history = useHistory();

  useEffect(() => {
    if (loading){
      return;
    }
    if (user || error) {
      logout().then(() => {
        history.push("/");
      });
    }
  }, [user, loading, error, history]);

  return <div>Logging Out....</div>;
}

export default Logout;
