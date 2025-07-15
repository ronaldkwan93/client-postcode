import { useRef, useState } from "react";
import styles from "./PostCode.module.scss";
import { getPostCodeBySuburbAndState } from "../services/dataServices";
import { AlertCircle, MapPin, RotateCcw, Search } from "lucide-react";
import ShakeWrapper from "../utilities/ShakeWrapper";

const PostCode = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subInput, setSubInput] = useState<string>("");
  const [stateInput, setStateInput] = useState<string>("");
  const [postCode, setPostCode] = useState<String>("");
  const [errorMessage, setErrorMessage] = useState<Boolean>(false);
  const [valErrors, setValidationErrors] = useState<{
    subInput: String;
    stateInput: String;
  }>({ subInput: "", stateInput: "" });
  const [shake, setShake] = useState(false);
  const [confirmedState, setConfirmedState] = useState<String>("");
  const [confirmedSuburb, setConfirmedSuburb] = useState<String>("");

  const validateFields = (subInput: string, stateInput: string) => {
    if (subInput == "" || stateInput == "") {
      setValidationErrors({
        ...valErrors,
        subInput: "Suburb and State are required!",
      });

      return false;
    } else if (/\d/.test(subInput)) {
      setValidationErrors({
        ...valErrors,
        subInput: "Numbers are not valid!",
      });
      return false;
    }
    return true;
  };

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostCode("");
    setStateInput("");
    setSubInput("");
    setErrorMessage(false);
    setValidationErrors({ subInput: "", stateInput: "" });
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage(false);
    setPostCode("");
    inputRef.current?.focus();
    const fieldsValidated = validateFields(subInput, stateInput);
    if (!fieldsValidated) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const result = await getPostCodeBySuburbAndState(subInput, stateInput);
    if (result == undefined) {
      setErrorMessage(true);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    setValidationErrors({ subInput: "", stateInput: "" });
    setPostCode(result);
    setConfirmedState(stateInput);
    setConfirmedSuburb(subInput);
  };

  console.log(subInput);
  console.log(stateInput);
  console.log(postCode);

  return (
    <div className={styles.container}>
      <div>
        <MapPin className={styles.container__pin} />
        <h2>PostCode Finder</h2>
      </div>
      <form
        action=""
        className={styles.container__form}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.container__form__input}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Suburb name"
            name="sub-input"
            value={subInput}
            onChange={(e) => setSubInput(e.target.value)}
          />
          <select
            name="state-input"
            id="state-input"
            value={stateInput}
            onChange={(e) => setStateInput(e.target.value)}
          >
            <option value="">Select state</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="ACT">ACT</option>
            <option value="NT">NT</option>
          </select>
        </div>
      </form>

      <div>
        <button
          type="button"
          onClick={handleRefresh}
          className={styles.container__refresh}
        >
          <RotateCcw size={20} />
        </button>
        <button onClick={handleSubmit} className={styles.container__findButton}>
          <div className={styles.container__findButton__section}>
            <Search />
            Find Postcode
          </div>
        </button>
      </div>
      {(valErrors.subInput || valErrors.stateInput) && (
        <div className={styles.container__form__error}>
          <ShakeWrapper shake={shake}>
            <AlertCircle />
            {valErrors.subInput && <div>{valErrors.subInput}</div>}
            {valErrors.stateInput && <div>{valErrors.stateInput}</div>}
          </ShakeWrapper>
        </div>
      )}
      {postCode && (
        <div className={styles.container__postcodeFound}>
          <h5>Postcode found!</h5>
          <h1>{postCode ?? postCode}</h1>
          <p>
            {confirmedSuburb}, {confirmedState}
          </p>
        </div>
      )}
      {errorMessage && (
        <div className={styles.container__postcodeNotFound}>
          <ShakeWrapper shake={shake}>
            <div>No Postcode found! Try again!</div>
          </ShakeWrapper>
        </div>
      )}
    </div>
  );
};

export default PostCode;
