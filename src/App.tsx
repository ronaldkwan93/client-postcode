import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import styles from "./AppSass.module.scss";
import Home from "./pages/Home";
import Suburbs from "./pages/Suburbs";
import PostCode from "./pages/PostCode";
import Header from "./components/Header/Header";
import AddSuburb from "./pages/AddSuburb";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <div className={styles.container}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suburb" element={<Suburbs />} />
            <Route path="/postcode" element={<PostCode />} />
            <Route path="/addsuburb" element={<AddSuburb />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
  
export default App;
