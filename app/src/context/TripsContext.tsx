import React, { createContext, useState } from "react";

export const TripsContext = createContext<any | null>(null);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<any>([]);

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
  };
  return <TripsContext.Provider value={{ trips, fetchTrips }}>{children}</TripsContext.Provider>;
};
