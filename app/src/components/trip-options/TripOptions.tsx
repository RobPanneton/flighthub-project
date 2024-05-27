import React from "react";

import { useTripsContext } from "../../context/TripsContext";
import { useAirlinesContext } from "../../context/AirlinesContext";
import { RoundTrip, Trip } from "../../types/tripTypes";
import { getRandomNumForKey } from "../../utils/varUtils";

import styles from "./TripOptions.module.scss";
import { Airline } from "../../types/airlineTypes";
import { TripItem } from "./trip-item/TripItem";

export const TripOptions: React.FC = () => {
  const { trips } = useTripsContext();
  const { airlines } = useAirlinesContext();

  const numOfTrips = trips.length;

  // cart logic would be called here
  const handleSelect = () => 0;

  const isRoundTrip = (trip: Trip | RoundTrip): trip is RoundTrip => (trip as RoundTrip).returnFlight !== undefined;

  return (
    <div className={styles.tripsWrapper}>
      {trips.length ? (
        <div className={styles.resultsWrapper}>
          <h3 className={styles.resultsText}>
            {numOfTrips} result{numOfTrips > 1 ? "s" : ""} found
          </h3>
          <div className={styles.resultsContainer}>
            {trips.map((trip: Trip | RoundTrip, index) => {
              const airline: Airline | undefined = airlines?.find((a) => a.code === trip.outgoingFlight.airline);
              let returnAirline: Airline | undefined;
              if (isRoundTrip(trip)) returnAirline = airlines?.find((a) => a.code === trip.returnFlight.airline);

              if (!airline) return null;
              return (
                <div key={`${index}-${getRandomNumForKey()}`} className={styles.result}>
                  <div className={styles.priceAndCTA}>
                    <div className={styles.price}>
                      <h3>CAD {trip.totalPrice}</h3>
                      <span>Final total price (taxes included)</span>
                    </div>
                    <button type='button' onClick={handleSelect}>
                      <span>SELECT</span> <span>{">"}</span>
                    </button>
                  </div>
                  <TripItem flight={trip.outgoingFlight} airline={airline} type='outgoing' />
                  {isRoundTrip(trip) && returnAirline !== undefined && (
                    <TripItem flight={trip.outgoingFlight} airline={returnAirline} type='return' />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.ctaWrapper}>
          <h1>Search for a flight!</h1>
        </div>
      )}
    </div>
  );
};
