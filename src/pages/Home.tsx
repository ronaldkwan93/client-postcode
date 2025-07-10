import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__heading}>
        <h1>Postcode API</h1>
        <p>Your comprehensive postcode and suburb lookup service</p>
      </div>
      <div>
        <h2>I want to...</h2>
        <div>
          <div className={styles.container__action}>
            <h3>Choose an action</h3>
            <p>▼</p>
          </div>
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
