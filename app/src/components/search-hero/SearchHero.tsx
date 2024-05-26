import React from "react";
import { Loader } from "../shared/loader/Loader";
import { useAirportsContext } from "../../context/AirportsContext";
import { useTripsContext } from "../../context/TripsContext";

import styles from "./SearchHero.module.scss";

type TripType = {
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
  const { fetchTrips, setForm, setTripType, tripType } = useTripsContext();

  const tripTypes: TripType[] = [
    { text: "Round Trip", value: "round-trip" },
    { text: "One Way", value: "one-way" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrips();
  };

  const handleTripTypeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.value === tripType) return;
    setTripType(target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((pv: any) => ({
      ...pv,
      [id]: id.includes("date") ? new Date(value) : value,
    }));
  };

  return (
    <div className={styles.searchHeroWrapper}>
      {airports?.length ? (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <ul className={styles.tripOptions}>
            {tripTypes.map((type: TripType, i: number) => {
              return (
                <li key={`${i}-${type.value}`} className={`${type.value === tripType ? styles.selected : ""}`}>
                  <button type='button' value={type.value} onClick={handleTripTypeClick}>
                    {type.text}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <label htmlFor='from'>From</label>
              <input onChange={handleInput} type='text' id='departure' placeholder='Leaving from' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='to'>To</label>
              <input onChange={handleInput} type='text' id='destination' placeholder='Going to' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='depart'>Depart</label>
              <input onChange={handleInput} type='date' id='departure_date' placeholder='Departure Date' />
            </div>
            {tripType === "round-trip" ? (
              <div className={styles.formRow}>
                <label htmlFor='return'>Return</label>
                <input onChange={handleInput} type='date' id='return_date' placeholder='Return Date' />
              </div>
            ) : (
              <div className={styles.inputFiller}></div>
            )}
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
