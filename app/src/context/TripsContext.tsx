import React, { createContext, useContext, useEffect, useState } from "react";
import { Errors, Trip, TripForm, TripsContextType } from "../types/tripTypes";

export const TripsContext = createContext<TripsContextType | null>(null);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [form, setForm] = useState<TripForm>({
    departure: "",
    destination: "",
    departure_date: null,
    return_date: null,
  });
  const [tripType, setTripType] = useState<string>("one-way");
  const [error, setError] = useState<Errors>({
    destination: false,
    dates: false,
  });

  const apiURL = process.env.REACT_APP_FLIGHT_API_URL;

  const isReturnDateAfterDeparture = (departureDate: Date, returnDate: Date): boolean => returnDate <= departureDate;

  const fetchTrips = async () => {
    // set error state for dates to false if there is no departure date and stop api call
    if (!form.departure_date) return setError((pv) => ({ ...pv, dates: true }));

    // check if return date is on or earlier than departure date
    if (form?.return_date && isReturnDateAfterDeparture(form.departure_date, form.return_date))
      return setError((pv) => ({ ...pv, dates: true }));

    try {
      const res = await fetch(`${apiURL}/trips/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departure: form.departure,
          destination: form.destination,
          departure_date: form.departure_date?.toISOString(),
          arrival_date: tripType === "round-trip" ? form.return_date : null,
        }),
      });
      const data = await res.json();
      setTrips(data);
    } catch (e) {
      console.error("Error fetching trips:", e);
    }
    return;
  };

  return (
    <TripsContext.Provider value={{ trips, fetchTrips, form, tripType, setForm, setTripType }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => {
  const context = useContext(TripsContext);
  if (context === null) throw new Error("useTranscriptContext must be used within a TranscriptProvider");

  return context;
};
