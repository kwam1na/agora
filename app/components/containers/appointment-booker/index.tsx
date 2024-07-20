"use client";

import { format, isToday, isTomorrow } from "date-fns";
import {
  Calendar,
  CalendarCheck,
  CalendarCheck2,
  Clock,
  MapPin,
  Scissors,
} from "lucide-react";
import { useAppointmentSelector } from "../../appointment-selector-provider";
import { Separator } from "@/components/ui/separator";
import { CustomerInputForm } from "./CustomerInputForm";
import { FadeIn } from "../../animated/fade-in";

const AppointmentInfo = ({
  icon,
  info,
}: {
  icon: React.ReactElement;
  title: string;
  info: string;
}) => {
  return (
    <div className="inline-flex gap-2 items-center">
      <div>{icon}</div>
      <div className="flex flex-col">
        <p className="text-sm">{info}</p>
      </div>
    </div>
  );
};

export const AppointmentDetails = () => {
  const { selectedTimeSlot, selectedDate, selectedService, storeLocation } =
    useAppointmentSelector();

  let appointmentDetails: string | null = null;
  if (selectedDate) {
    appointmentDetails = isToday(selectedDate)
      ? `Later today at ${selectedTimeSlot}`
      : isTomorrow(selectedDate)
      ? `Tomorrow at ${selectedTimeSlot}`
      : `${format(selectedDate, "MMMM dd, yyyy")} at ${selectedTimeSlot}`;
  }

  return selectedService && appointmentDetails && selectedTimeSlot ? (
    <div className="flex flex-col gap-2">
      <AppointmentInfo
        title="Service"
        info={selectedService.name}
        icon={<Scissors className="w-4 h-4 text-muted-foreground" />}
      />
      <AppointmentInfo
        title="Date"
        info={appointmentDetails}
        icon={<Clock className="w-4 h-4 text-muted-foreground" />}
      />
      {storeLocation && (
        <AppointmentInfo
          title="Location"
          info={storeLocation}
          icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
        />
      )}
    </div>
  ) : null;
};

export const AppointmentBooker = () => {
  const { hasSelectedAppointment } = useAppointmentSelector();
  return (
    <FadeIn className="w-full space-y-4 border border-1 rounded-sm">
      <div className="text-grey-900 flex items-center space-x-2 py-2 px-4 border-b">
        <CalendarCheck2 className="w-4 h-4" />
        <p className="text-sm">Appointment details</p>
      </div>
      <div className="flex flex-col gap-8 px-8 pb-8">
        <AppointmentDetails />
        {hasSelectedAppointment && <Separator />}
        <CustomerInputForm />
      </div>
    </FadeIn>
  );
};
