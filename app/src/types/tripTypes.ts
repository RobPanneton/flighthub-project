export type TripsContextType = {
  trips: Flight[][];
  fetchTrips: (departure: string, destination: string, date: string) => void;
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
