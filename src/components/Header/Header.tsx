import { Home, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "../../context/UserContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { loggedInUser, logout } = useAuth();

  const handleHomeNav = () => {
    navigate("/");
  };

  const handleLogNav = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    console.log(loggedInUser);
  };
  
  return (
    <div className={styles.container}>
      <button onClick={handleHomeNav}>
        <Home />
      </button>
      <div>
        {loggedInUser == null ? (
          <button className={styles.container__btn} onClick={handleLogNav}>
            Login
            <LogIn />
          </button>
        ) : (
          <button className={styles.container__btn} onClick={handleLogout}>
            Logout
            <LogOut/>
            {/* <LogIn /> */}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
