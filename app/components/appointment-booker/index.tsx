"use client";

import { format, isToday } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useAppointmentSelector } from "../appointment-selector-provider";
import { Separator } from "@/components/ui/separator";
import { CustomerInputForm } from "./CustomerInputForm";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/constants";

const AppointmentInfo = ({
  icon,
  info,
}: {
  icon: React.ReactElement;
  title: string;
  info: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      {icon}
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
      : `${format(selectedDate, "MMMM dd, yyyy")} at ${selectedTimeSlot}`;
  }

  return selectedService && appointmentDetails && selectedTimeSlot ? (
    <div className="flex flex-col gap-2">
      <AppointmentInfo
        title="Service"
        info={selectedService.name}
        icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
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
  return (
    <motion.div
      className="w-full p-8 space-y-4 border border-1 rounded-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-md">Appointment details</h2>
      <div className="flex flex-col gap-8">
        <AppointmentDetails />
        <Separator />
        <CustomerInputForm />
      </div>
    </motion.div>
  );
};
