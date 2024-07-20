"use client";

import { AppointmentBooker } from "@/app/components/containers/appointment-booker";
import { AppointmentsContainer } from "@/app/components/containers/appointment-container";
import { useAppointmentSelector } from "@/app/components/appointment-selector-provider";
import { ServicesContainer } from "@/app/components/containers/services-container";
import { StoreInfo } from "@/app/components/store-info";
import { Spinner } from "@/components/ui/spinner";
import { BusinessHours, StoreLocation } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { MutableRefObject, useEffect, useRef } from "react";
import { EmptyState } from "../components/empty-state";
import { HeartCrack } from "lucide-react";
import { ATHENA_URL, containerVariants } from "@/lib/constants";
import { useWindowSize } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

export default function AppointmentPage() {
  const {
    selectedService,
    setStoreLocation,
    setStorePhoneNumber,
    selectedDate,
  } = useAppointmentSelector();
  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      fetch(
        `${ATHENA_URL}/api/v1/1/services?appointment.status=pending,in-progress`
      ).then((res) => res.json()),
  });

  const shopQuery = useQuery({
    queryKey: ["shop-data"],
    queryFn: () =>
      fetch(`${ATHENA_URL}/api/v1/stores/1`).then((res) => res.json()),
  });

  const shop = shopQuery.data;
  const businessHours: BusinessHours = shopQuery.data?.store_hours;
  const storeLocation: StoreLocation = shopQuery.data?.store_location;
  const storePhoneNumber = shopQuery.data?.store_phone_number;
  const storeName = shop?.name;

  useEffect(() => {
    if (storeLocation && storeName) {
      setStoreLocation(
        `${storeName}, ${storeLocation.street_address}, ${storeLocation.city}, ${storeLocation.country}`
      );
    }

    if (storePhoneNumber) {
      setStorePhoneNumber(storePhoneNumber);
    }
  }, [storeLocation, storePhoneNumber, storeName]);

  const loadingData = servicesQuery.isLoading || shopQuery.isLoading;

  const servicesRef = useRef(null);
  const appointmentsRef = useRef(null);
  const appointmentsBookerRef = useRef(null);
  const { width } = useWindowSize();

  const scrollToSection = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (width <= 750)
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
  };

  return (
    <AnimatePresence>
      <div className="flex flex-col h-screen pb-8">
        <div className="flex-grow space-y-8 pb-12">
          {!loadingData &&
            !servicesQuery.isError &&
            servicesQuery.data &&
            !servicesQuery.data?.error && (
              <div className="flex flex-col lg:flex-row gap-12">
                <div
                  className="flex w-full lg:w-[25%] gap-4"
                  ref={servicesRef}
                  onClick={() => scrollToSection(appointmentsRef)}
                >
                  <ServicesContainer services={servicesQuery.data} />
                </div>
                <div className="w-full lg:w-[50%] flex gap-8">
                  <AppointmentsContainer
                    startTime={selectedService?.start_time}
                    endTime={selectedService?.end_time}
                    interval={selectedService?.interval_type}
                  />
                </div>
                <div className="w-full lg:w-[25%] flex flex-col gap-16">
                  <AppointmentBooker />
                  {!shopQuery.isError &&
                    !shopQuery.data?.error &&
                    businessHours?.length > 0 && (
                      <StoreInfo businessHours={businessHours} />
                    )}
                </div>
              </div>
            )}
          {loadingData && (
            <div className="w-full h-screen flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          )}
          {(servicesQuery.isError || servicesQuery.data?.error) && (
            <EmptyState
              icon={
                <HeartCrack className="w-[80px] h-[80px] text-muted-foreground" />
              }
              text={"Something went wrong on our end. Please try again later."}
            />
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
