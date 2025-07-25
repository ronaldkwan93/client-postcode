import { useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import styles from "./Home.module.scss";
import MotionWrapper from "../utilities/MotionWrapper";

const Home = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className={styles.container}>
      <MotionWrapper>
        <div className={styles.container__heading}>
          <h1>Postcode APIz</h1>
          <p>Your comprehensive postcode and suburb lookup service</p>
        </div>
      </MotionWrapper>

      <div>
        <h2>I want to...</h2>
        <div className={styles.container__actionBox}>
          <div
            className={styles.container__action}
            onClick={() => setDropDown((prev) => !prev)}
          >
            <h3>Choose an action</h3>
            <p
              className={`${styles["container__arrow"]} ${
                dropDown ? styles["container__arrow--flipped"] : ""
              }`}
            >
              ▼
            </p>
          </div>
          {dropDown && (
            <div className={styles.container__dropdown}>
              <Dropdown />
            </div>
          )}
        </div>
      </div>
      <div className={styles.container__info}>
        <div className={styles.container__info__box}>
          <p>⚡</p>
          <div>Lightning Fast</div>
        </div>
        <div className={styles.container__info__box}>
          <p>🎯</p>
          <div>Accurate Data</div>
        </div>
        <div className={styles.container__info__box}>
          <p>🔧</p>
          <div>Easy to Use</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
