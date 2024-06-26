import React, { createContext, useState, useEffect, useContext } from "react";
import { AirlinesContextType } from "../types/airlineTypes";

export const AirlinesContext = createContext<AirlinesContextType | null>(null);

export const AirlinesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [airlines, setAirlines] = useState([]);

  const apiURL = process.env.REACT_APP_FLIGHT_API_URL;

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await fetch(`${apiURL}/airlines`);
        const data = await response.json();
        setAirlines(data);
      } catch (error) {
        console.error("Error fetching airlines:", error);
      }
    };

    fetchAirlines();
  }, [apiURL]);

  return <AirlinesContext.Provider value={{ airlines }}>{children}</AirlinesContext.Provider>;
};

export const useAirlinesContext = () => {
  const context = useContext(AirlinesContext);
  if (context === null) throw new Error("useTranscriptContext must be used within a TranscriptProvider");

  return context;
};
