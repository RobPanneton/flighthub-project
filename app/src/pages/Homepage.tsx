import React from "react";
import { AirportsProvider } from "../context/AirportsContext";
import { TripsProvider } from "../context/TripsContext";

export const Homepage: React.FC = () => {
  return (
    <AirportsProvider>
      <TripsProvider>
        <div>homepage</div>
      </TripsProvider>
    </AirportsProvider>
  );
};
