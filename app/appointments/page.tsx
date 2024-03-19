"use client";

import { BookedApointment } from "./past/components/booked-appointment";
import { useEffect, useState } from "react";
import { Appointment, CustomerDetails } from "../lib/types";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { ATHENA_URL } from "@/lib/constants";

export default function Appointments() {
  const [userDetails, setUserDetails] = useState<CustomerDetails | null>(null);
  const [loadedUserDetails, setLoadedUserDetails] = useState(false);

  useEffect(() => {
    const savedDetails = localStorage.getItem("customer-details");
    setUserDetails(savedDetails ? JSON.parse(savedDetails) : null);
    setLoadedUserDetails(true);
  }, []);

  const appointmentsQuery = useQuery({
    queryKey: ["pending-appointments"],
    queryFn: () =>
      fetch(
        `${ATHENA_URL}/api/v1/1/services/appointments?customer_emails=${userDetails?.email_addresses.join(
          ","
        )}&status=pending`
      ).then((res) => res.json()),
    enabled: loadedUserDetails,
  });

  const appointments: Appointment[] = appointmentsQuery?.data;

  return (
    <div className="h-screen flex">
      {!appointmentsQuery.isLoading && appointments?.length > 0 && (
        <div className="w-full md:w-[60%] h-screen flex flex-col p-4 gap-4">
          {appointments?.map((appointment: Appointment) => {
            return (
              <BookedApointment
                key={appointment.id}
                appointment={appointment}
              />
            );
          })}
        </div>
      )}
      {appointments?.length == 0 && !appointmentsQuery.isLoading && (
        <div className="w-full pt-32">
          <p className="text-sm text-center">No appointments</p>
        </div>
      )}
      {appointmentsQuery.isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
