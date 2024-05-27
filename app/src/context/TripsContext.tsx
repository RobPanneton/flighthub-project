import React, { createContext, useContext, useState } from "react";
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
  const [tripType, setTripType] = useState<string>("round-trip");
  const [errors, setErrors] = useState<Errors>({
    destination: false,
    dates: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiURL = process.env.REACT_APP_FLIGHT_API_URL;

  const isReturnDateAfterDeparture = (departureDate: Date, returnDate: Date): boolean => returnDate <= departureDate;

  const isDateOnOrBeforeToday = (departureDate: Date): boolean => {
    const date = new Date(departureDate);
    const today = new Date();

    // support same day by using current time and comparing flights against it
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  const handleError = (key: string) => {
    setErrors((pv) => ({ ...pv, [key]: true }));
    setIsLoading(false);
  };

  const fetchTrips = async () => {
    setIsLoading(true);
    // set error state for dates to false if there is no departure date and stop api call
    if (!form.departure_date || isDateOnOrBeforeToday(form?.departure_date)) return handleError("dates");

    // check if return date is on or earlier than departure date
    if (form?.return_date && isReturnDateAfterDeparture(form.departure_date, form.return_date))
      return handleError("dates");

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
          return_date: tripType === "round-trip" ? form.return_date?.toISOString() : null,
        }),
      });
      const data = await res.json();

      // fake timeout to emulate loading time
      setTimeout(() => {
        setIsLoading(false);
        setTrips(data);
      }, 1000);
    } catch (e) {
      console.error("Error fetching trips:", e);
      setIsLoading(false);
    }
    return;
  };

  return (
    <TripsContext.Provider value={{ trips, fetchTrips, form, errors, tripType, setForm, setTripType, isLoading }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => {
  const context = useContext(TripsContext);
  if (context === null) throw new Error("useTranscriptContext must be used within a TranscriptProvider");

  return context;
};
