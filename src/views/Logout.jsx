import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return null;
};

export default Logout;
