import { InfoLine } from "@/app/appointments/components/info-line";
import { BusinessHours } from "@/lib/types";
import { format } from "date-fns";
import { MapPin, Phone } from "lucide-react";
import { useAppointmentSelector } from "../appointment-selector-provider";

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
    <div className="w-full space-y-8">
      <p className="text-md">Business hours</p>
      <StoreHours hours={hours} />
      <div className="flex flex-col gap-4 border rounded-lg p-6">
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
    </div>
  );
};
