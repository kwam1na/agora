"use client";

import { useAppointmentSelector } from "../appointment-selector-provider";
import { format, isToday } from "date-fns";
import { LoadingButton } from "../loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ATHENA_URL } from "@/lib/constants";

export const Footer = () => {
  const {
    selectedTimeSlot,
    selectedDate,
    selectedService,
    hasSelectedAppointment,
  } = useAppointmentSelector();

  const queryClient = useQueryClient();

  const createAppointmentDate = (selectedDate: Date, timeSlot: string) => {
    // Split the timeSlot into components
    const [time, meridian] = timeSlot.split(" ");
    let [hoursString, minutes] = time.split(":");

    let hours = parseInt(hoursString);
    // Convert hours to 24-hour format if 'pm' is specified
    if (meridian.toLowerCase() === "pm" && hoursString !== "12") {
      hours = parseInt(hoursString) + 12;
    } else if (meridian.toLowerCase() === "am" && hoursString === "12") {
      hours = 0; // Midnight
    }

    // Clone the selectedDate and set the time
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, parseInt(minutes), 0, 0); // Reset seconds and milliseconds to 0

    return appointmentDate;
  };

  const bookAppointment = async () => {
    return await fetch(`${ATHENA_URL}/api/v1/1/services/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: selectedService?.id,
        customer_id: "1",
        time_slot: selectedTimeSlot,
        date: createAppointmentDate(selectedDate!, selectedTimeSlot!),
      }),
    });
  };

  const mutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  let appointmentDetails: string | null = null;
  if (selectedDate) {
    appointmentDetails = isToday(selectedDate)
      ? `${selectedService?.name} later today at ${selectedTimeSlot}`
      : `${selectedService?.name} on ${format(
          selectedDate,
          "MMMM dd, yyyy"
        )} at ${selectedTimeSlot}`;
  }

  const d = () => {
    console.log(format("2024-03-10T20:00:00.000Z", "MMMM dd, yyyy hh:mm aa"));
  };

  return (
    <footer className="w-full h-[120px] flex items-center justify-end px-8">
      <div className="flex items-center justify-center gap-4">
        {hasSelectedAppointment && appointmentDetails && (
          <h1 className="text-xl ml-4">{appointmentDetails}</h1>
        )}
        <LoadingButton
          isLoading={mutation.isPending}
          variant={"default"}
          className="bg-gray-900 text-white hover:bg-gray-700"
          size={"lg"}
          disabled={!hasSelectedAppointment || mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          Book
        </LoadingButton>
      </div>
    </footer>
  );
};
