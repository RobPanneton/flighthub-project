import React from "react";
import { AirportsProvider } from "../context/AirportsContext";
import { TripsProvider } from "../context/TripsContext";
import { AirlinesProvider } from "../context/AirlinesContext";

import { Header } from "../components/shared/header/Header";
import { SearchHero } from "../components/search-hero/SearchHero";
import { TripOptions } from "../components/trip-options/TripOptions";

import styles from "./Homepage.module.scss";

export const Homepage: React.FC = () => {
  return (
    <AirportsProvider>
      <AirlinesProvider>
        <TripsProvider>
          <div className={styles.wrapper}>
            <Header />
            <SearchHero />
            <TripOptions />
          </div>
        </TripsProvider>
      </AirlinesProvider>
    </AirportsProvider>
  );
};
