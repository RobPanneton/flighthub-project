export type AirlineContext = {
  airlines: Airline[] | null;
};

export type Airline = {
  id: number;
  code: string;
  name: string;
};
