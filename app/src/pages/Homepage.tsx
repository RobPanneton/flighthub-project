import React from "react";
import { AirportsProvider } from "../context/AirportsContext";
import { TripsProvider } from "../context/TripsContext";
import { AirlinesProvider } from "../context/AirlinesContext";

import { Header } from "../components/shared/header/Header";
import { SearchHero } from "../components/search-hero/SearchHero";

export const Homepage: React.FC = () => {
  return (
    <AirportsProvider>
      <AirlinesProvider>
        <TripsProvider>
          <Header />
          <SearchHero />
          <div>homepage</div>
        </TripsProvider>
      </AirlinesProvider>
    </AirportsProvider>
  );
};
