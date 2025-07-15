import { useRef, useState } from "react";
import styles from "./AddSuburb.module.scss";
import { addPostCodeAndSuburb } from "../services/dataServices";

const AddSuburb = () => {
    const inputRef = useRef<HTMLInputElement>(null);
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [submitStatus, setSubmitStatus] = useState<Boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addPostCodeAndSuburb(postcode, suburb);
    setSubmitStatus(result ?? false);
  };

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostcode("");
    setSuburb("");
    setSubmitStatus(false);
    inputRef.current?.focus();
  };

  console.log(postcode);
  console.log(suburb);

  return (
    <div className={styles.container}>
      <h1>Add Suburb</h1>
      <form
        action=""
        className={styles.container__form}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            ref={inputRef}
             type="text"
            placeholder="postcode"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <input
            type="text"
            placeholder="suburb"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
        </div>
          <button type="button" onClick={handleRefresh}>
            🔄
          </button>
        <div>
          {submitStatus ? <div>Submitted!</div> : <button>Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default AddSuburb;
