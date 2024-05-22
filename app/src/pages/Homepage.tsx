import React from "react";
import { AirportsProvider } from "../context/AirportsContext";
import { TripsProvider } from "../context/TripsContext";
import { AirlinesProvider } from "../context/AirlinesContext";

export const Homepage: React.FC = () => {
  return (
    <AirportsProvider>
      <AirlinesProvider>
        <TripsProvider>
          <div>homepage</div>
        </TripsProvider>
      </AirlinesProvider>
    </AirportsProvider>
  );
};
