export type Service = {
  id: string;
  name: string;
  price: number;
  currency: string;
  start_time: string;
  end_time: string;
  interval_type: string;
  appointments: Appointment[];
};

export type StoreLocation = {
  street_address: string;
  city: string;
  country: string;
};

export type AppointmentStatus = "pending" | "ended";

export type Appointment = {
  id: string;
  time_slot: string;
  date: Date;
  service_id: string;
  service: Service;
  status: AppointmentStatus;
  store: {
    store_location: StoreLocation;
  };
};

export type CustomerDetails = {
  first_name: string;
  last_name: string;
  email_addresses: string[];
  phone_number: string;
};
