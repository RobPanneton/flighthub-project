import React, { useState } from "react";
import { Loader } from "../shared/loader/Loader";
import { useAirportsContext } from "../../context/AirportsContext";

import styles from "./SearchHero.module.scss";

type TripOption = {
  text: string;
  value: string;
};

// type FormLabel = {
//   labelText: string;
//   labelValue: string;
//   placeholder: string;
// };

export const SearchHero: React.FC = () => {
  const { airports } = useAirportsContext();

  const [form, setForm] = useState<any>({
    tripOption: "one-way",
  });

  const tripOptions: TripOption[] = [
    { text: "Round Trip", value: "round-trip" },
    { text: "One Way", value: "one-way" },
  ];

  // const formLabels: FormLabel[] = [
  //   {
  //     labelText: "From",
  //     labelValue: "departure",
  //     placeholder: "Leaving from",
  //   },
  //   {
  //     labelText: "To",
  //     labelValue: "destination",
  //     placeholder: "Going to",
  //   },
  //   {
  //     labelText: "Depart",
  //     labelValue: "departure-date",
  //     placeholder: "Departure Date",
  //   },
  //   {
  //     labelText: "Return",
  //     labelValue: "return-date",
  //     placeholder: "",
  //   },
  // ];

  const handleSubmit = () => 0;

  const handleTripOptionsClick = (e: any) => {
    if (e.target.value === form.tripOPtion) return;
    setForm({
      ...form,
      tripOption: e.target.value,
    });
  };

  return (
    <div className={styles.searchHeroWrapper}>
      {airports?.length ? (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <ul className={styles.tripOptions}>
            {tripOptions.map((option: TripOption, i: number) => {
              return (
                <li
                  key={`${i}-${option.value}`}
                  className={`${option.value === form.tripOption ? styles.selected : ""}`}
                >
                  <button type='button' value={option.value} onClick={handleTripOptionsClick}>
                    {option.text}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <label htmlFor='from'>From</label>
              <input type='text' id='from' placeholder='Leaving from' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='from'>From</label>
              <input type='text' id='from' placeholder='Leaving from' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='from'>From</label>
              <input type='text' id='from' placeholder='Leaving from' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='from'>From</label>
              <input type='text' id='from' placeholder='Leaving from' />
            </div>
          </div>
          <button type='submit' className={styles.submitButton}>
            Search Flights
          </button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};
