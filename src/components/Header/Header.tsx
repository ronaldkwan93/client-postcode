import { Home, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeNav = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <button onClick={handleHomeNav}>
        <Home />
      </button>
      <div>
        <button className={styles.container__btn}>
          Login
          <LogIn />
        </button>
      </div>
    </div>
  );
};

export default Header;
