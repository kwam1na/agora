import { InfoLine } from "@/app/appointments/components/info-line";
import { BusinessHours } from "@/lib/types";
import { format } from "date-fns";
import { Building2, MapPin, Phone, Store } from "lucide-react";
import { useAppointmentSelector } from "../appointment-selector-provider";
import { FadeIn } from "../animated/fade-in";

type StoreHourProps = {
  day: string;
  hours: string;
  isToday?: boolean;
};

type StoreInfoProps = {
  hours: StoreHourProps[];
};

const StoreHour: React.FC<StoreHourProps> = ({ day, hours, isToday }) => {
  return (
    <div
      className={`grid grid-cols-[80px,1fr] items-center ${
        isToday ? "font-semibold" : ""
      }`}
    >
      <p className="text-sm">{day}</p>
      <p className="text-sm">{hours}</p>
    </div>
  );
};

const StoreHours: React.FC<StoreInfoProps> = ({ hours }) => {
  const today = new Date();
  const todayFormatted = format(today, "iii");
  return (
    <div className="space-y-4 w-full">
      {hours?.map((hour) => {
        return (
          <StoreHour
            key={hour.day}
            day={hour.day}
            hours={hour.hours}
            isToday={
              hour.day.toLocaleLowerCase() === todayFormatted.toLowerCase()
            }
          />
        );
      })}
    </div>
  );
};

export const StoreInfo = ({
  businessHours,
}: {
  businessHours: BusinessHours;
}) => {
  const { storeLocation, storePhoneNumber } = useAppointmentSelector();
  const hours = businessHours?.map((hour) => ({
    day: hour.day,
    hours: hour.is_closed ? "Closed" : `${hour.open_time} - ${hour.close_time}`,
  }));

  return (
    <FadeIn className="w-full space-y-12 border rounded">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 py-2 px-4 border-b">
          <Store className="w-4 h-4 text-grey-600" />
          <p className="text-sm text-grey-900">Business hours</p>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-2 px-10">
          <StoreHours hours={hours} />
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t p-6">
        {storePhoneNumber && (
          <InfoLine
            icon={<Phone className="w-4 h-4 text-muted-foreground" />}
            text={<a href={`tel:${storePhoneNumber}`}>{storePhoneNumber}</a>}
          />
        )}
        {storeLocation && (
          <InfoLine
            icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
            text={storeLocation}
          />
        )}
      </div>
    </FadeIn>
  );
};
