"use client";

import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, isToday } from "date-fns";
import { useAppointmentSelector } from "../appointment-selector-provider";
import { Appointment } from "@/app/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { BusinessHours, Shop } from "@/lib/types";
import { getDisabledDays, isShopClosedOnDate } from "@/lib/utils";
import { useGetCachedStoreData } from "@/lib/hooks";

const getTimeComponents = (time: string) => {
  const components = time.split(" ");
  const meridian = components[1];
  const hour = components[0].split(":")[0];

  return { hour, meridian };
};

const createTimeSlots = (
  schedule: Record<string, string>,
  interval: string
) => {
  const {
    startTimeHour,
    startTimeMeridian,
    endTimeHour,
    endTimeMeridian,
    nowHour,
    nowMeridian,
  } = schedule;
  const { selectedDate } = useAppointmentSelector();
  const intervalMinutes = interval === "halfHour" ? 30 : 60;
  let slots: Record<string, string[]> = { morning: [], afternoon: [] };

  const isSameDay = selectedDate && isToday(selectedDate);

  // Convert start and end times to 24-hour format
  let startHour24 =
    (parseInt(startTimeHour) % 12) + (startTimeMeridian === "pm" ? 12 : 0);

  const nowHour24 = (parseInt(nowHour) % 12) + (nowMeridian === "PM" ? 12 : 0);

  // cutoff start hour based on the time of the day
  // if the difference between now and start hour is 1, set start hour to 1 hour in the future
  if (isSameDay)
    startHour24 = startHour24 > nowHour24 ? startHour24 : nowHour24 + 1;

  let endHour24 =
    (parseInt(endTimeHour) % 12) + (endTimeMeridian === "pm" ? 12 : 0);

  // Generate time slots
  for (let hour = startHour24; hour <= endHour24; hour++) {
    let meridian = hour < 12 || hour === 24 ? "am" : "pm";
    let displayHour = hour > 12 ? hour - 12 : hour;
    if (displayHour === 0) displayHour = 12; // handle midnight

    let slot = `${displayHour}:00 ${meridian}`;
    if (hour < 12 || hour === 24) {
      slots.morning.push(slot);
    } else {
      slots.afternoon.push(slot);
    }

    // Add half-hour slot if needed
    if (intervalMinutes === 30 && hour < endHour24) {
      slot = `${displayHour}:30 ${meridian}`;
      if (hour < 12 || hour === 23) {
        slots.morning.push(slot);
      } else {
        slots.afternoon.push(slot);
      }
    }
  }

  return slots;
};

const DateSelector = () => {
  const { selectedDate, setSelectedDate, setSelectedTimeSlot } =
    useAppointmentSelector();

  const shopData = useGetCachedStoreData();

  const disabledDays = getDisabledDays(shopData?.store_hours || []);

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={(date: Date | undefined) => {
        setSelectedTimeSlot(null);
        setSelectedDate(date);
      }}
      fromDate={new Date()}
      disabled={{ dayOfWeek: disabledDays }}
    />
  );
};

const TimeOption = ({ time }: { time: string }) => {
  const {
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedService,
    selectedDate,
  } = useAppointmentSelector();

  const isSelected = selectedTimeSlot === time;

  const isAlreadyBooked = selectedService?.appointments.some(
    (appointment: Appointment) =>
      appointment.service_id == selectedService?.id &&
      isSameDay(selectedDate!, appointment.date) &&
      time == appointment.time_slot
  );

  return (
    <div
      className={`w-full flex ${
        isSelected
          ? "border-2 border-[#000]"
          : isAlreadyBooked
          ? "bg-gray-200"
          : "bg-[#fff]"
      } justify-center items-center px-4 py-2 rounded-lg border hover:shadow-sm ${
        isAlreadyBooked ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={isAlreadyBooked ? undefined : () => setSelectedTimeSlot(time)}
      aria-disabled={!isAlreadyBooked}
    >
      <p
        className={`text-center text-sm ${
          isSelected ? "font-semibold" : isAlreadyBooked ? "text-gray-400" : ""
        }`}
      >
        {time}
      </p>
    </div>
  );
};

const TimeOptionRow = ({ times }: { times: string[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {times.map((time: string) => {
        return <TimeOption key={time} time={time} />;
      })}
    </div>
  );
};

const TimePicker = ({
  startTime,
  endTime,
  interval,
}: {
  startTime: string;
  endTime: string;
  interval: string;
}) => {
  const { selectedDate } = useAppointmentSelector();
  const shopData = useGetCachedStoreData();

  if (selectedDate) {
    if (isShopClosedOnDate(selectedDate, shopData?.store_hours || []))
      return (
        <div className="w-full h-auto p-8">
          <p className="text-sm">Our shop is closed on the selected date</p>
        </div>
      );
  }

  const { hour: startTimeHour, meridian: startTimeMeridian } =
    getTimeComponents(startTime);
  const { hour: endTimeHour, meridian: endTimeMeridian } =
    getTimeComponents(endTime);

  const now = Date.now();
  const formattedTime = format(now, "h:mm aa");

  const { hour: nowHour, meridian: nowMeridian } =
    getTimeComponents(formattedTime);

  const timeSlots = createTimeSlots(
    {
      startTimeHour,
      startTimeMeridian,
      endTimeHour,
      endTimeMeridian,
      nowHour,
      nowMeridian,
    },
    interval
  );

  const { morning, afternoon } = timeSlots;

  return (
    <div className="w-full h-auto">
      <div className="flex flex-col gap-4 p-8">
        <TimeOptionRow times={morning} />
        <TimeOptionRow times={afternoon} />
        {morning.length == 0 && afternoon.length == 0 && (
          <p className="text-sm">
            No time slots available for the selected date
          </p>
        )}
      </div>
    </div>
  );
};

const TimeSelector = ({
  startTime,
  endTime,
  interval,
}: {
  startTime: string;
  endTime: string;
  interval: string;
}) => {
  return (
    <div className="flex flex-col gap-4 h-auto">
      <TimePicker startTime={startTime} endTime={endTime} interval={interval} />
    </div>
  );
};

export const AppointmentsContainer = ({
  startTime,
  endTime,
  interval,
}: {
  startTime?: string;
  endTime?: string;
  interval?: string;
}) => {
  const hasSelectedService = startTime && endTime && interval;
  return (
    <div className="w-full space-y-4">
      <h2 className="text-md">When should we expect you?</h2>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-2">
        <div>
          <DateSelector />
        </div>
        {hasSelectedService && (
          <TimeSelector
            startTime={startTime}
            endTime={endTime}
            interval={interval}
          />
        )}
      </div>
    </div>
  );
};
