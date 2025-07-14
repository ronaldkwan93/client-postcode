import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import styles from './AppSass.module.scss'
import Home from "./pages/Home";
import Suburbs from "./pages/Suburbs";
import PostCode from "./pages/PostCode";

function App() {
  return (
    <>
      <div className={styles.container}>
        <BrowserRouter>
        <div>
          <button>Login</button>
        </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suburb" element={<Suburbs />} />
            <Route path="/postcode" element={<PostCode />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
