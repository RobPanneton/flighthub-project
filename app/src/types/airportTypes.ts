export type AirportsContextType = {
  airports: Airport[] | null;
};

export type Airport = {
  code: string;
  city_code: string;
  name: string;
  city: string;
  country_code: string;
  region_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
};
