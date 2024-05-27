export type AirlinesContextType = {
  airlines: Airline[] | null;
};

export type Airline = {
  id: number;
  code: string;
  name: string;
  logo: string;
};
