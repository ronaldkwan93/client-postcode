import { useRef, useState } from "react";
import styles from "./PostCode.module.scss";
import { getPostCodeBySuburbAndState } from "../services/dataServices";

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

  const validateFields = (subInput: string, stateInput: string) => {
    if (subInput == "" || stateInput == "") {
      setValidationErrors({
        ...valErrors,
        subInput: "Suburb or State can't be empty!",
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
      return;
    }
    const result = await getPostCodeBySuburbAndState(subInput, stateInput);
    if (result == undefined) {
      setErrorMessage(true);
    }
    setValidationErrors({ subInput: "", stateInput: "" });
    setPostCode(result);
  };

  console.log(subInput);
  console.log(stateInput);
  console.log(postCode);

  return (
    <div className={styles.container}>
      <div>
        <h1>PostCode Finder</h1>
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
            placeholder="Provide a suburb"
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
        </div>
        <button type="button" onClick={handleRefresh}>
          🔄
        </button>
      </form>
      {(valErrors.subInput || valErrors.stateInput) && (
        <div className={styles.container__form__error}>
          {valErrors.subInput && <div>{valErrors.subInput}</div>}
          {valErrors.stateInput && <div>{valErrors.stateInput}</div>}
        </div>
      )}
      <div>
        <button onClick={handleSubmit} className={styles.container__findButton}>
          Find me postcode
        </button>
      </div>
      <div className={styles.container__postcode}>{postCode ?? postCode}</div>
      <div>{errorMessage && <div>No Postcode found! Try again!</div>}</div>
    </div>
  );
};

export default PostCode;
