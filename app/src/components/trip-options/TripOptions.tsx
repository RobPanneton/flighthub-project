import React from "react";

import { useTripsContext } from "../../context/TripsContext";
import { useAirlinesContext } from "../../context/AirlinesContext";
import { RoundTrip, Trip } from "../../types/tripTypes";
import { getRandomNumForKey } from "../../utils/varUtils";

import styles from "./TripOptions.module.scss";
import { Airline } from "../../types/airlineTypes";

export const TripOptions: React.FC = () => {
  const { trips } = useTripsContext();
  const { airlines } = useAirlinesContext();

  const numOfTrips = trips.length;

  // cart logic would be called here
  const handleSelect = () => 0;

  const isRoundTrip = (trip: Trip | RoundTrip): trip is RoundTrip => (trip as RoundTrip).returnFlight !== undefined;

  const getDuration = (departureTime: Date, arrivalTime: Date) => {
    const totalMinutes = Math.floor((arrivalTime.getTime() - departureTime.getTime()) / 60000);
    const hours = String(Math.floor(totalMinutes / 60));
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}h${minutes}`;
  };

  const getThreeLastChars = (s: string) => s.slice(-3);

  const formatDateTime = (date: Date): { [key1: string]: string } => {
    const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const formattedDate = date.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" });

    return { time, formattedDate };
  };

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
                const airline: Airline | undefined = airlines?.find((a) => a.code === trip.flight.airline);
                const { time: depTime, formattedDate: depDate } = formatDateTime(new Date(trip.flight.departure_time));
                const { time: arrTime, formattedDate: arrDate } = formatDateTime(new Date(trip.flight.arrival_time));

                if (airline)
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
                        <div className={styles.flightDetails}>
                          <div className={styles.logoContainer}>
                            <img src={airline.logo} alt='airline-logo' />
                          </div>
                          <div className={styles.description}>
                            <span>{airline.name}</span>
                            <span className={styles.flightNum}>Flight {getThreeLastChars(trip.flight.number)}</span>
                            <span className={styles.flightClass}>Economy</span>
                            <span className={styles.flightDuration}>
                              {getDuration(new Date(trip.flight.departure_time), new Date(trip.flight.arrival_time))}
                            </span>
                          </div>
                        </div>
                        <div className={styles.timeAndAirport}>
                          <div className={styles.infoRow}>
                            <span className={styles.time}>{depTime}</span>
                            <span className={styles.date}>{depDate}</span>
                            <span className={styles.airport}>{trip.flight.departure_airport}</span>
                          </div>
                          <div className={styles.infoRow}>
                            <span className={styles.time}>{arrTime}</span>
                            <span className={styles.date}>{arrDate}</span>
                            <span className={styles.airport}>{trip.flight.arrival_airport}</span>
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
