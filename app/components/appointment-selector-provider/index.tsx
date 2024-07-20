"use client";

import { Service } from "@/app/lib/types";
import React, { createContext, useState, useContext, useMemo } from "react";

type AppoitmentSelectorContextType = {
  clear: () => void;
  storeLocation: string | null;
  storePhoneNumber: string | null;
  hasSelectedAppointment: boolean;
  selectedService: Service | null;
  setSelectedService: React.Dispatch<React.SetStateAction<Service | null>>;
  setStorePhoneNumber: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<string | null>>;
  setStoreLocation: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const AppointmentSelectorContext =
  createContext<AppoitmentSelectorContextType | null>(null);

export const useAppointmentSelector = () => {
  const context = useContext(AppointmentSelectorContext);
  if (!context) {
    throw new Error(
      "useAppointmentSelector must be used within a AppointmentSelectorProvider"
    );
  }
  return context;
};

export const AppointmentSelectorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storeLocation, setStoreLocation] = useState<string | null>(null);
  const [storePhoneNumber, setStorePhoneNumber] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const hasSelectedAppointment =
    !!selectedDate && !!selectedService && !!selectedTimeSlot;

  const clear = () => {
    setSelectedDate(undefined);
    setSelectedService(null);
    setSelectedTimeSlot(null);
  };
  const contextValue = useMemo(
    () => ({
      clear,
      storeLocation,
      storePhoneNumber,
      hasSelectedAppointment,
      selectedService,
      selectedDate,
      selectedTimeSlot,
      setSelectedService,
      setSelectedDate,
      setSelectedTimeSlot,
      setStoreLocation,
      setStorePhoneNumber,
    }),
    [
      selectedService,
      selectedDate,
      selectedTimeSlot,
      storeLocation,
      storePhoneNumber,
    ]
  );

  return (
    <AppointmentSelectorContext.Provider value={contextValue}>
      {children}
    </AppointmentSelectorContext.Provider>
  );
};
