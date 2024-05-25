import React, { createContext, useContext, useEffect, useState } from "react";
import { Trip, TripsContextType } from "../types/tripTypes";

export const TripsContext = createContext<TripsContextType | null>(null);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [form, setForm] = useState<any>({
    departure: "",
    destination: "",
    departure_date: null,
    return_date: null,
  });
  const [tripType, setTripType] = useState<string>("one-way");

  const apiURL = process.env.REACT_APP_FLIGHT_API_URL;

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${apiURL}/trips/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departure: form.departure,
          destination: form.destination,
          departure_date: form.departure_date.toISOString(),
        }),
      });
      console.log({ res });
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
