"use client";

import { useQuery } from "@tanstack/react-query";
import { BookedApointment } from "../components/booked-appointment";
import { Appointment, CustomerDetails } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ATHENA_URL } from "@/lib/constants";
import { FadeIn } from "@/app/components/animated/fade-in";

export default function PastAppointments() {
  const [userDetails, setUserDetails] = useState<CustomerDetails | null>(null);
  const [loadedUserDetails, setLoadedUserDetails] = useState(false);

  useEffect(() => {
    const savedDetails = localStorage.getItem("customer-details");
    setUserDetails(savedDetails ? JSON.parse(savedDetails) : null);
    setLoadedUserDetails(true);
  }, []);

  const appointmentsQuery = useQuery({
    queryKey: ["ended-appointments"],
    queryFn: () =>
      fetch(
        `${ATHENA_URL}/api/v1/1/services/appointments?customer_emails=${userDetails?.email_addresses.join(
          ","
        )}&status=canceled,ended`
      ).then((res) => res.json()),
    enabled: loadedUserDetails,
  });

  const appointments: Appointment[] = appointmentsQuery?.data;

  return (
    <FadeIn className="h-screen flex">
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
    </FadeIn>
  );
}
