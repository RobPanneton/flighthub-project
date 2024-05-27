import React from "react";

import styles from "./TripItem.module.scss";
import { Airline } from "../../../types/airlineTypes";
import { Trip } from "../../../types/tripTypes";

export const TripItem: React.FC<{
  airline: Airline;
  trip: Trip;
}> = ({ airline, trip }) => {
  const handleSelect = () => 0;

  const getThreeLastChars = (s: string) => s.slice(-3);

  const getDuration = (departureTime: Date, arrivalTime: Date) => {
    const totalMinutes = Math.floor((arrivalTime.getTime() - departureTime.getTime()) / 60000);
    const hours = String(Math.floor(totalMinutes / 60));
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}h${minutes}`;
  };

  const formatDateTime = (date: Date): { [key: string]: string } => {
    const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const formattedDate = date.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" });

    return { time, formattedDate };
  };

  const { time: depTime, formattedDate: depDate } = formatDateTime(new Date(trip.outgoingFlight.departure_time));
  const { time: arrTime, formattedDate: arrDate } = formatDateTime(new Date(trip.outgoingFlight.arrival_time));

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
        <div className={styles.flightDetails}>
          <div className={styles.logoContainer}>
            <img src={airline.logo} alt='airline-logo' />
          </div>
          <div className={styles.description}>
            <span>{airline.name}</span>
            <span className={styles.flightNum}>Flight {getThreeLastChars(trip.outgoingFlight.number)}</span>
            <span className={styles.flightClass}>Economy</span>
            <span className={styles.flightDuration}>
              {getDuration(new Date(trip.outgoingFlight.departure_time), new Date(trip.outgoingFlight.arrival_time))}
            </span>
          </div>
        </div>
        <div className={styles.timeAndAirport}>
          <div className={styles.infoRow}>
            <span className={styles.time}>{depTime}</span>
            <span className={styles.date}>{depDate}</span>
            <span className={styles.airport}>{trip.outgoingFlight.departure_airport}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.time}>{arrTime}</span>
            <span className={styles.date}>{arrDate}</span>
            <span className={styles.airport}>{trip.outgoingFlight.arrival_airport}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
