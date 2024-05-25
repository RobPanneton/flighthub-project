import React, { useState } from "react";
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
  const { fetchTrips } = useTripsContext();

  const [form, setForm] = useState<any>({
    trip_type: "one-way",
    departure_airport: "",
    arrival_airport: "",
    departure_time: "",
  });

  const tripTypes: TripType[] = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString();
    fetchTrips("YUL", "YVR", date);
  };

  const handleTripTypeClick = (e: any) => {
    if (e.target.value === form.trip_type) return;
    setForm({
      ...form,
      trip_type: e.target.value,
    });
  };

  return (
    <div className={styles.searchHeroWrapper}>
      {airports?.length ? (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <ul className={styles.tripOptions}>
            {tripTypes.map((type: TripType, i: number) => {
              return (
                <li key={`${i}-${type.value}`} className={`${type.value === form.trip_type ? styles.selected : ""}`}>
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
              <input type='text' id='from' placeholder='Leaving from' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='to'>To</label>
              <input type='text' id='to' placeholder='Going to' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='depart'>Depart</label>
              <input type='text' id='depart' placeholder='Departure Date' />
            </div>
            <div className={styles.formRow}>
              <label htmlFor='return'>Return</label>
              <input type='text' id='return' placeholder='Return Date' />
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
