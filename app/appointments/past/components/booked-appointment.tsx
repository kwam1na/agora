"use client";

import { LoadingButton } from "@/app/components/loading-button";
import { Appointment } from "@/app/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Ban,
  Calendar,
  CheckCircle2,
  Clock,
  Cross,
  Map,
  MapPin,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { InfoLine } from "./info-line";

export const BookedApointment = ({
  appointment,
}: {
  appointment: Appointment;
}) => {
  const queryClient = useQueryClient();

  const cancelAppointment = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/1/services/appointments/${appointment.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "cancel",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error ending appointment");
    }

    return await response.json();
  };

  const mutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ended-appointments"],
      });
      toast("Appointment canceled", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    },
    onError: () => {
      toast("Something went wrong", {
        icon: <Ban className="h-4 w-4" />,
      });
    },
  });

  return (
    <div className="flex justify-between p-8 rounded-md shadow-sm border border-1 bg-white">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">{appointment.service.name}</p>

        <InfoLine
          icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
          text={`${appointment.store.store_location.street_address}, ${appointment.store.store_location.city}, ${appointment.store.store_location.country}`}
          isMuted
        />

        <InfoLine
          icon={<Clock className="w-4 h-4 text-muted-foreground" />}
          text={format(appointment.date, "MMMM dd, yyyy 'at' hh:mm aaa")}
          isMuted
        />
      </div>
      {/* <div className="space-y-2">
        {appointment.status === "pending" && (
          <LoadingButton
            className="w-full"
            variant={"outline"}
            isLoading={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            <XCircle className="mr-2 w-4 h-4" />
            Cancel
          </LoadingButton>
        )}
      </div> */}
    </div>
  );
};
