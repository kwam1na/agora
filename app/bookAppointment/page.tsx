"use client";

import { AppointmentBooker } from "@/app/components/appointment-booker";
import { AppointmentsContainer } from "@/app/components/appointment-container";
import { useAppointmentSelector } from "@/app/components/appointment-selector-provider";
import { ServicesContainer } from "@/app/components/services-container";
import { StoreInfo } from "@/app/components/store-info";
import { Spinner } from "@/components/ui/spinner";
import { BusinessHours, StoreLocation } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { EmptyState } from "../components/empty-state";
import { HeartCrack } from "lucide-react";
import { ATHENA_URL } from "@/lib/constants";

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

  const businessHours: BusinessHours = shopQuery.data?.store_hours;
  const storeLocation: StoreLocation = shopQuery.data?.store_location;
  const storePhoneNumber = shopQuery.data?.store_phone_number;

  useEffect(() => {
    if (storeLocation) {
      setStoreLocation(
        `${storeLocation.street_address}, ${storeLocation.city}, ${storeLocation.country}`
      );
    }

    if (storePhoneNumber) {
      setStorePhoneNumber(storePhoneNumber);
    }
  }, [storeLocation, storePhoneNumber]);

  const loadingData = servicesQuery.isLoading || shopQuery.isLoading;

  return (
    <div className="flex flex-col h-screen pb-8">
      <div className="flex-grow space-y-8 pb-12">
        {!loadingData && !servicesQuery.isError && servicesQuery.data && (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex w-full xl:w-[25%] gap-4">
              <ServicesContainer services={servicesQuery.data} />
            </div>
            <div className="w-full lg:w-[50%] flex flex-col gap-8">
              <AppointmentsContainer
                startTime={selectedService?.start_time}
                endTime={selectedService?.end_time}
                interval={selectedService?.interval_type}
              />
              {selectedService && selectedDate && <AppointmentBooker />}
            </div>
            {businessHours?.length > 0 && (
              <div className="w-full xl:w-[25%]">
                <StoreInfo businessHours={businessHours} />
              </div>
            )}
          </div>
        )}
        {loadingData && (
          <div className="w-full h-screen flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
        {servicesQuery.isError && (
          <EmptyState
            icon={
              <HeartCrack className="w-[116px] h-[116px] text-muted-foreground" />
            }
            text={
              "We are having some issues right now. Please try again later."
            }
          />
        )}
      </div>
    </div>
  );
}
