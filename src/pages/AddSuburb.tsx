import { useRef, useState } from "react";
import styles from "./AddSuburb.module.scss";
import { addPostCodeAndSuburb } from "../services/dataServices";
import { AlertCircle, Check, Plus, RotateCcw } from "lucide-react";
import ShakeWrapper from "../utilities/ShakeWrapper";

const AddSuburb = () => {
  const postRef = useRef<HTMLInputElement>(null);
  const suburbRef = useRef<HTMLInputElement>(null);
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [submitStatus, setSubmitStatus] = useState<Boolean>(false);
  const [valError, setValError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValError("");
    setSubmitStatus(false);
    if (postcode === "") {
      setValError("Postcode and Suburb are required!");
      postRef.current?.focus();
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    } else if (/[A-Za-z]/.test(postcode)) {
      setValError("Please provide a valid postcode");
      postRef.current?.focus();
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return false;
    } else if (suburb === "") {
      setValError("Postcode and Suburb are required!");
      suburbRef.current?.focus();
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } else if (/\d/.test(suburb)) {
      setValError("Please enter a valid Suburb");
      suburbRef.current?.focus();
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const result = await addPostCodeAndSuburb(postcode, suburb);
    if(result === undefined) {
        setValError("Suburb already exists in this area!");
      suburbRef.current?.focus();
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setSubmitStatus(result ?? false);
  };

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostcode("");
    setSuburb("");
    setSubmitStatus(false);
    setValError("");
    postRef.current?.focus();
  };

  console.log(postcode);
  console.log(suburb);

  return (
    <div className={styles.container}>
      <div>
        <Plus className={styles.container__plus} />
        <h2>Add a Suburb</h2>
      </div>
      <form
        action=""
        className={styles.container__form}
        onSubmit={handleSubmit}
      >
        <div className={styles.container__form__input}>
          <input
            ref={postRef}
            type="text"
            placeholder="Enter 4-digit postcode"
            // inputMode="numeric"
            // pattern="\d{4}"
            maxLength={4}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <input
            ref={suburbRef}
            type="text"
            placeholder="Enter suburb name"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
        </div>

        <div className={styles.container__buttons}>
          <button
            type="button"
            onClick={handleRefresh}
            className={styles.container__refresh}
          >
            <RotateCcw size={20} />
          </button>
          <button
            type="submit"
            className={
              submitStatus
                ? styles.container__success
                : styles.container__submitButton
            }
          >
            <div className={styles.container__submitButton__section}>
              {submitStatus ? (
                <div className={styles.container__submitSuccess}>
                  <Check />
                  Submitted!
                </div>
              ) : (
                <div className={styles.container__plusButton}>
                  <Plus />
                  Add Suburb
                </div>
              )}
            </div>
          </button>
        </div>
        {valError && (
          <div className={styles.container__validationError}>
            <ShakeWrapper shake={shake}>
              <AlertCircle />
              <div>{valError}</div>
            </ShakeWrapper>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddSuburb;
