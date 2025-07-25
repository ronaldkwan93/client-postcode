import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { useEffect, useRef, useState } from "react";
import { loginUser } from "../services/dataServices";
import { useAuth } from "../context/UserContextProvider";

const Login = () => {
  const { setLoggedInUser, setUserRole, userRole, setJwt } =
    useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginState, setLoginState] = useState(false);

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const response = await loginUser(email, password);
    console.log(response);
    if (response == null) {
      setError("Invalid email or password");
      emailRef.current?.focus();
      return;
    } 
    setLoginMessage("You're in! Redirecting..");
    setUserRole(response.roles[0]);
    setJwt(response.jwtToken);
    setLoggedInUser(email);
    setLoginState(true);
  };
  console.log(userRole);

  useEffect(() => {
    if (loginState) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loginState]);

  return (
    <div className={styles.container}>
      <h1>Welcome Back</h1>
      <p>Sign in to your account</p>

      <form action="" onSubmit={handleFormSubmit}>
        <div className={styles.container__form}>
          <div className={styles.container__formDiv}>
            <label htmlFor="">Email Address: </label>
            <input
              type="text"
              ref={emailRef}
              autoComplete="username"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className={styles.container__formDiv}>
            <label htmlFor="">Password: </label>
            <input
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={styles.container__formExtras}>
          {error && <div className={styles.container__error}>{error}</div>}
          {loginMessage && (
            <div className={styles.container__success}>{loginMessage}</div>
          )}
          <div className={styles.container__signin}>
            <button>Sign in</button>
          </div>
        </div>
      </form>
      <div>
        <p>Don't have an account?</p>
        <p onClick={handleSignUpClick} className={styles.container__signup}>
          Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
