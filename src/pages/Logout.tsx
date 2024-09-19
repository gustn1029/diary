import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useReduxToolkitHook";
import { logout } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(appAuth);
        navigate("/");
        dispatch(logout());
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };

    handleLogout();
  }, []);
  return null;
};

export default Logout;
