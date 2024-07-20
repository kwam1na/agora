import { Service } from "@/app/lib/types";
import { useAppointmentSelector } from "../../appointment-selector-provider";
import { CheckCircle2, Scissors } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Shop } from "@/lib/types";
import { shopQueryKey } from "@/lib/query-keys";
import { FadeIn } from "../../animated/fade-in";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        isSelected ? "border-2 border-grey-800 shadow-md" : ""
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

      {isSelected && <CheckCircle2 className="w-6 h-6 text-grey-800" />}
    </div>
  );
};

export const ServicesContainer = ({ services }: { services: Service[] }) => {
  const queryClient = useQueryClient();
  const shop = queryClient.getQueryData<Shop>(shopQueryKey);

  return (
    <FadeIn className="w-full space-y-4 border border-1 rounded-sm">
      <div className="text-grey-900 flex items-center space-x-2 py-2 px-4 border-b">
        <Scissors className="w-4 h-4" />
        <p className="text-sm">Choose your service</p>
      </div>
      <div className="px-4 space-y-4 pb-8 pt-2">
        {services &&
          services?.map((service) => (
            <ServiceOption
              key={service.id}
              service={service}
              currency={shop?.currency}
            />
          ))}
      </div>
    </FadeIn>
  );
};
