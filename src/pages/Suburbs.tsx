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
};

const Suburbs = () => {
  const [subs, setsubs] = useState<Postcode | null>(null);
  const [postcode, setPostcode] = useState<string>("");

  console.log("assignedSuburbs:", subs?.assignedSuburbs);

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
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode"
          />{" "}
        </div>
        <div>
          <button>Find me suburbs!</button>
        </div>
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
