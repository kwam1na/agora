export type BusinessHour = {
  day: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
};

export type BusinessHours = BusinessHour[];

export type StoreLocation = {
  street_address: string;
  city: string;
  country: string;
};

export type Shop = {
  currency: string;
  name: string;
  store_hours: BusinessHours;
  store_location: StoreLocation;
  store_phone_number?: string;
};
