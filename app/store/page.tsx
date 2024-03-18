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

const StorePage = () => {
  const { selectedService, setStoreLocation, setStorePhoneNumber } =
    useAppointmentSelector();
  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      fetch(
        "http://localhost:8080/api/v1/1/services?appointment.status=pending,in-progress"
      ).then((res) => res.json()),
  });

  const shopQuery = useQuery({
    queryKey: ["shop-data"],
    queryFn: () =>
      fetch("http://localhost:8080/api/v1/stores/1").then((res) => res.json()),
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
        {!loadingData && (
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
              {selectedService && <AppointmentBooker />}
            </div>
            <div className="w-full xl:w-[25%]">
              <StoreInfo businessHours={businessHours} />
            </div>
          </div>
        )}
        {loadingData && (
          <div className="w-full h-screen flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
