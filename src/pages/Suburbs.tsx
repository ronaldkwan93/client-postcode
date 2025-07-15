import { useRef, useState } from "react";
import styles from "./Suburbs.module.scss";
import { getSuburbs } from "../services/dataServices";

type Suburb = {
  suburb: string;
};

type Postcode = {
  id: number;
  code: string;
  assignedSuburbs: Suburb[];
  state: string;
};

const Suburbs = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subs, setsubs] = useState<Postcode | null>(null);
  const [postcode, setPostcode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Boolean>(false);
  const [valError, setValError] = useState<string>("");


  console.log("assignedSuburbs:", subs?.assignedSuburbs);

  const validateField = (postcode: string) => {
    if(postcode == "") {
      setValError("Postcode can't be empty!");
      return false;
    } 
    return true;
  }

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostcode("");
    setsubs(null);
    setErrorMessage(false);
    setValError("");
    inputRef.current?.focus();
    
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    if (e.target.value == "") {
      setsubs(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setsubs(null);
    setErrorMessage(false);
    setValError("");
    inputRef.current?.focus();
    const fieldValid = validateField(postcode);
    if(!fieldValid) {
      return;
    } 

    if (postcode.trim() !== "") {
      try {
        const data = await getSuburbs(postcode);
        if (data) {
          console.log("Received suburb data:", data);

          setsubs(data);
        }
        console.log(data, "null here?");
        if (data === null) {
          setErrorMessage(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  console.log(subs);
  console.log(postcode);

  return (
    <div className={styles.container}>
      <div>
        <h1>Suburb finder </h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            value={postcode ?? ""}
            onChange={handleInputChange}
            placeholder="Enter postcode"
          />
          <button type="button" onClick={handleRefresh}>
            🔄
          </button>
        </div>
        <div>{valError && valError}</div>
        <div>
          <button>Find me suburbs!</button>
        </div>
        <div>{postcode && subs && <p>State: {subs?.state}</p>}</div>
        <div className={styles.container__results}>
          {postcode &&
            subs?.assignedSuburbs?.map((suburb, idx) => (
              <div key={idx}>{suburb.suburb}</div>
            ))}
        </div>
        <div>
          {errorMessage && <div>Sorry this Postcode has no suburbs yet!</div>}
        </div>
      </form>
    </div>
  );
};

export default Suburbs;
