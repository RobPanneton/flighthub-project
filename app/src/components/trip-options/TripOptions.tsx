import React from "react";
import { useTripsContext } from "../../context/TripsContext";
import { RoundTrip, Trip } from "../../types/tripTypes";
import { getRandomNumForKey } from "../../utils/varUtils";

import styles from "./TripOptions.module.scss";

export const TripOptions: React.FC = () => {
  const { trips } = useTripsContext();

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
              if (isRoundTrip(trip)) {
                return (
                  <div key={`${index}-${getRandomNumForKey}`} className={styles.result}>
                    <div className={styles.priceAndCTA}>
                      <div className={styles.price}>
                        <h3>CAD {trip.totalPrice}</h3>
                        <span>Final total price (taxes included)</span>
                      </div>
                      <button type='button' onClick={handleSelect}>
                        <span>SELECT</span> <span>{">"}</span>
                      </button>
                    </div>
                    <div className={styles.info}>
                      <div className={styles.airline}>{trip.outgoingFlight.airline}</div>
                      <div className={styles.timeAndAirport}>
                        <div className={styles.infoRow}>
                          <span>{trip.outgoingFlight.departure_time}</span>
                          <span>{trip.outgoingFlight.departure_airport}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>{trip.outgoingFlight.arrival_time}</span>
                          <span>{trip.outgoingFlight.arrival_airport}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={styles.result}>
                    <div className={styles.priceAndCTA}>
                      <div className={styles.price}>
                        <h3>CAD {trip.totalPrice}</h3>
                        <span>Final total price (taxes included)</span>
                      </div>
                      <button type='button' onClick={handleSelect}>
                        <span>SELECT</span> <span>{">"}</span>
                      </button>
                    </div>
                    <div className={styles.info}>
                      <div className={styles.airline}>{trip.flight.airline}</div>
                      <div className={styles.timeAndAirport}>
                        <div className={styles.infoRow}>
                          <span>{trip.flight.departure_time}</span>
                          <span>{trip.flight.departure_airport}</span>
                        </div>
                        <div className={styles.infoRow}>
                          <span>{trip.flight.arrival_time}</span>
                          <span>{trip.flight.arrival_airport}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
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
