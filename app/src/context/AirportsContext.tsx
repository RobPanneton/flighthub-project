import React, { createContext, useState, useEffect, useContext } from "react";
import { AirportsContextType } from "../types/airportTypes";

export const AirportsContext = createContext<AirportsContextType | null>(null);

export const AirportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [airports, setAirports] = useState([]);

  const apiURL = process.env.REACT_APP_FLIGHT_API_URL;

  useEffect(() => {
    const getAirportData = async () => {
      try {
        const res = await fetch(`${apiURL}/airports`);
        const data = await res.json();
        setAirports(data);
      } catch (e) {
        console.error(e);
      }
    };
    getAirportData();
  }, [apiURL]);

  return <AirportsContext.Provider value={{ airports }}>{children}</AirportsContext.Provider>;
};

export const useAirportsContext = () => {
  const context = useContext(AirportsContext);
  if (context === null) throw new Error("useTranscriptContext must be used within a TranscriptProvider");

  return context;
};
