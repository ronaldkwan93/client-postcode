import { useRef, useState } from "react";
import styles from "./Suburbs.module.scss";
import { getSuburbs } from "../services/dataServices";
import { AlertCircle, Home, RotateCcw, Search } from "lucide-react";
import ShakeWrapper from "../utilities/ShakeWrapper";

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
  const [shake, setShake] = useState(false);

  console.log("assignedSuburbs:", subs?.assignedSuburbs);

  const validateField = (postcode: string) => {
    if (postcode == "") {
      setValError("Postcode can't be empty!");
      return false;
    } else if (/[A-Za-z]/.test(postcode)) {
      setValError("Please provide a valid postcode");
      return false;
    }
    return true;
  };

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
    if (!fieldValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    if (postcode.trim() !== "") {
      try {
        const data = await getSuburbs(postcode);
        if (data) {
          setsubs(data);
        }
        console.log(data, "null here?");
        if (data === null) {
          setShake(true);
          setErrorMessage(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };


  return (
    <div className={styles.container}>
      <div>
        <Home className={styles.container__home} />
        <h2>Suburb finder </h2>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className={styles.container__form__input}
      >
        <div>
          <input
            ref={inputRef}
            type="text"
            maxLength={4}
            value={postcode ?? ""}
            onChange={handleInputChange}
            placeholder="Enter 4-digit postcode"
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
          <button type="submit" className={styles.container__findButton}>
            <div className={styles.container__findButton__section}>
              <Search />
              Find Postcode
            </div>
          </button>
        </div>
        {postcode && subs && (
          <div className={styles.container__results}>
            <h3>{subs.state}</h3>
            <div className={styles.container__results__list}>
              {subs.assignedSuburbs.map((suburb, idx) => (
                <div className={styles.container__results__subs} key={idx}>
                  {suburb.suburb}
                </div>
              ))}
            </div>
          </div>
        )}

        {valError && (
          <div className={styles.container__suburbsNotFound}>
            <ShakeWrapper shake={shake}>
              <AlertCircle />
              <div>{valError}</div>
            </ShakeWrapper>
          </div>
        )}
        {errorMessage && (
          <div className={styles.container__suburbsNotFound}>
            <ShakeWrapper shake={shake}>
              <AlertCircle />
              <div>Sorry this Postcode has no suburbs yet!</div>
            </ShakeWrapper>
          </div>
        )}
      </form>
    </div>
  );
};

export default Suburbs;
