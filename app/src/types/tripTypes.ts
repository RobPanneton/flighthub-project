export type TripsContextType = {
  trips: Trip[];
  fetchTrips: (departure: string, destination: string, date: string) => void;
};

// export type RoundTrip = {
//   outgoingFlight: Flight;
//   returnFlight: Flight;
//   totalPrice: string;
// };

export type Trip = {
  totalPrice: string;
  flight: Flight;
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
