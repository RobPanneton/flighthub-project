import React from "react";
import { AirportsProvider } from "../context/AirportsContext";

export const Homepage: React.FC = () => {
  return (
    <AirportsProvider>
      <div>homepage</div>
    </AirportsProvider>
  );
};
