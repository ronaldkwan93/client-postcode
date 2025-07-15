import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeNav = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleHomeNav}><Home/></button>
      {/* <button>Login</button> */}
    </div>
  );
};

export default Header;
