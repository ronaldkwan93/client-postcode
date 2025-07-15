import { useState } from "react";
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
  const [subs, setsubs] = useState<Postcode | null>(null);
  const [postcode, setPostcode] = useState<string>("");

  console.log("assignedSuburbs:", subs?.assignedSuburbs);

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostcode("");
    setsubs(null);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    if (e.target.value == "") {
      setsubs(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postcode.trim() !== "") {
      try {
        const data = await getSuburbs(postcode);
        if (data) {
          console.log("Received suburb data:", data);

          setsubs(data);
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
            type="text"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            value={postcode ?? ""}
            onChange={handleInputChange}
            placeholder="Enter postcode"
          />
        <button onClick={handleRefresh}>🔄</button>
        </div>
        <div>
          <button>Find me suburbs!</button>
        </div>
        <div>{postcode && subs && <p>State: {subs?.state}</p>}</div>
        <div>
          {postcode &&
            subs?.assignedSuburbs?.map((suburb, idx) => (
              <div key={idx}>{suburb.suburb}</div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Suburbs;
