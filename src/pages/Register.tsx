import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { useState } from "react";
import { registerUser } from "../services/dataServices";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/login");
  };

  const validationCheck = () => {
    if (name == "" || email == "" || password == "" || confirmPassword == "") {
      setErrorMessage("Please fill out all sections!");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validationCheck();
    if (!isValid) return;
    setErrorMessage("");

    const res = await registerUser(name, email, password);
    console.log(res.error);
    if (res.error == 409) {
      setErrorMessage("Email already in use. Please sign in!");
      return;
    }
    setSuccessMessage("Account successfully created! Please sign in!")
  };

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <form action="" onSubmit={handleFormSubmit}>
        <div className={styles.container__form}>
          <div>
            <label htmlFor="">Name: </label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Email Address: </label>
            <input
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password: </label>
            <input
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Confirm Password: </label>
            <input
              type="password"
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {errorMessage && (
          <div className={styles.container__error}>{errorMessage}</div>
        )}
        {successMessage && (
          <div className={styles.container__success}>{successMessage}</div>
        )}
        <div className={styles.container__create}>
          <button>Create Account</button>
        </div>
      </form>

      <div>
        <p>Already have an account?</p>
        <p onClick={handleSignInClick} className={styles.container__signIn}>
          Sign in
        </p>
      </div>
    </div>
  );
};

export default Register;
