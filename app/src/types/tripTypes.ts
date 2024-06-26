import { SetStateAction } from "react";

export type TripsContextType = {
  trips: Trip[] | RoundTrip[];
  fetchTrips: () => void;
  tripType: string;
  form: TripForm;
  errors: Errors;
  setForm: React.Dispatch<SetStateAction<any>>;
  setTripType: React.Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};

export type Trip = {
  totalPrice: string;
  outgoingFlight: Flight;
};

export type RoundTrip = Trip & {
  returnFlight: Flight;
};

export type TripForm = {
  departure: string;
  destination: string;
  departure_date: Date | null;
  return_date: Date | null;
};

export type Flight = {
  id: number;
  airline: string;
  number: string;
  departure_airport: string;
  departure_time: string;
  arrival_airport: string;
  arrival_time: string;
  price: number;
};

export type Errors = {
  destination: boolean;
  dates: boolean;
};
