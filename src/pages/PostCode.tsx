import styles from "./PostCode.module.scss";

const PostCode = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>PostCode Finder</h1>
      </div>
      <form action="" className={styles.container__form}>
        <input type="text" placeholder="Provide a suburb" />
        <select name="" id="">
          <option value="">-- Select --</option>
          <option value="NSW">NSW</option>
          <option value="VIC">VIC</option>
          <option value="QLD">QLD</option>
          <option value="WA">WA</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          <option value="ACT">ACT</option>
          <option value="NT">NT</option>
        </select>
        <button>Find me postcode</button>
      </form>
    </div>
  );
};

export default PostCode;
