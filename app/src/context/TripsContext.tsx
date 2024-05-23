import React, { createContext, useContext, useState } from "react";
import { Trip, TripsContextType } from "../types/tripTypes";

export const TripsContext = createContext<TripsContextType | null>(null);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const apiURL = process.env.REACT_APP_FLIGHT_API_URL;

  const fetchTrips = async (departure: string, destination: string, date: string) => {
    try {
      const res = await fetch(
        `${apiURL}/trips/suggestions?departure=${departure}&destination=${destination}&date=${date}`
      );
      const data = await res.json();
      setTrips(data);
    } catch (e) {
      console.error("Error fetching trips:", e);
    }
    return;
  };

  return <TripsContext.Provider value={{ trips, fetchTrips }}>{children}</TripsContext.Provider>;
};

export const useTripsContext = () => {
  const context = useContext(TripsContext);
  if (context === null) throw new Error("useTranscriptContext must be used within a TranscriptProvider");

  return context;
};
