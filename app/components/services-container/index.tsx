import { Service } from "@/app/lib/types";
import { useAppointmentSelector } from "../appointment-selector-provider";
import { CheckCircle2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Shop } from "@/lib/types";
import { shopQueryKey } from "@/lib/query-keys";

interface ServiceProps {
  service: Service;
  currency?: string;
}

const ServiceOption: React.FC<ServiceProps> = ({ currency, service }) => {
  const { selectedService, setSelectedService, setSelectedTimeSlot } =
    useAppointmentSelector();

  const { name, price } = service;
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency });
  const isSelected = selectedService?.id === service.id;

  return (
    <div
      className={`w-full flex items-center px-6 py-3 border ${
        isSelected ? "border-2 border-[#000] bg-white shadow-md" : ""
      } rounded-lg justify-between items-center p-4 cursor-pointer hover:shadow-sm`}
      onClick={() => {
        setSelectedTimeSlot(null);
        setSelectedService(service);
      }}
    >
      <div className="flex flex-col gap-1">
        <p className={`text-sm ${isSelected ? "font-semibold" : ""}`}>{name}</p>
        <p
          className={`text-xs text-muted-foreground ${
            isSelected ? "font-semibold" : ""
          }`}
        >
          {fmt.format(price)}
        </p>
      </div>

      {isSelected && <CheckCircle2 className="w-6 h-6" />}
    </div>
  );
};

export const ServicesContainer = ({ services }: { services: Service[] }) => {
  const queryClient = useQueryClient();
  const shop = queryClient.getQueryData<Shop>(shopQueryKey);

  return (
    <div className="w-full space-y-4">
      <p className="text-md">Services</p>
      {services &&
        services?.map((service) => (
          <ServiceOption
            key={service.id}
            service={service}
            currency={shop?.currency}
          />
        ))}
    </div>
  );
};
