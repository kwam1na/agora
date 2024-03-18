"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { useAppointmentSelector } from "../appointment-selector-provider";
import { getAppointmentDate } from "@/app/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, CheckCircle2, Pencil } from "lucide-react";
import { Icons } from "../Icons";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ATHENA_URL } from "@/lib/constants";

type CustomerDetails = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

const FormSchema = z.object({
  first_name: z.string().min(1, {
    message: "Please provide a valid name.",
  }),
  last_name: z.string().min(1, {
    message: "Please provide a valid name.",
  }),
  email: z.string().email(),
  phone_number: z.string().regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number"),
});

const SavedCustomerDetails = ({
  details,
  onClick,
  onEditClick,
  isButtonDisabled,
  isSubmitting,
}: {
  details: CustomerDetails;
  onClick: () => void;
  onEditClick: () => void;
  isButtonDisabled: boolean;
  isSubmitting: boolean;
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm">
        We saved your information from your last appointment
      </p>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <p className="text-sm">{details.first_name}</p>
              <p className="text-sm">{details.last_name}</p>
            </div>
            <p className="text-sm">{details.email}</p>
            <p className="text-sm">{details.phone_number}</p>
          </div>
          <Button variant={"outline"} size={"sm"} onClick={onEditClick}>
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
        <div>
          <LoadingButton
            isLoading={isSubmitting}
            onClick={onClick}
            disabled={isButtonDisabled}
          >
            Book appointment
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export function CustomerInputForm() {
  const {
    selectedTimeSlot,
    selectedDate,
    selectedService,
    hasSelectedAppointment,
  } = useAppointmentSelector();

  const queryClient = useQueryClient();
  const [shouldSaveCustomerDetails, setShouldSaveCustomerDetails] =
    useState(false);
  const [savedCustomerDetails, setSavedCustomerDetails] =
    useState<CustomerDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const retrievedDetails = localStorage.getItem("customer-details");
      const details: CustomerDetails | null = retrievedDetails
        ? JSON.parse(retrievedDetails)
        : null;
      setSavedCustomerDetails(details);
    } catch (e) {}
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: savedCustomerDetails?.first_name || "",
      last_name: savedCustomerDetails?.last_name || "",
      email: savedCustomerDetails?.email || "",
      phone_number: savedCustomerDetails?.phone_number || "",
    },
  });

  const createAppointmentDate = (selectedDate: Date, timeSlot: string) => {
    // Split the timeSlot into components
    const [time, meridian] = timeSlot.split(" ");
    let [hoursString, minutes] = time.split(":");

    let hours = parseInt(hoursString);
    // Convert hours to 24-hour format if 'pm' is specified
    if (meridian.toLowerCase() === "pm" && hoursString !== "12") {
      hours = parseInt(hoursString) + 12;
    } else if (meridian.toLowerCase() === "am" && hoursString === "12") {
      hours = 0; // Midnight
    }

    // Clone the selectedDate and set the time
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, parseInt(minutes), 0, 0); // Reset seconds and milliseconds to 0

    return appointmentDate;
  };

  const bookAppointment = async () => {
    const response = await fetch(
      `${ATHENA_URL}/api/v1/1/services/appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: selectedService?.id,
          first_name:
            form.getValues().first_name || savedCustomerDetails?.first_name,
          last_name:
            form.getValues().last_name || savedCustomerDetails?.last_name,
          email: form.getValues().email || savedCustomerDetails?.email,
          phone_number:
            form.getValues().phone_number || savedCustomerDetails?.phone_number,
          time_slot: selectedTimeSlot,
          date: createAppointmentDate(selectedDate!, selectedTimeSlot!),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error booking appointment");
    }

    return await response.json();
  };

  const mutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["pending-appointments"] });
      toast("Appointment booked", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
      router.push("/success");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast("Appointment unavailable", {
        icon: <Ban className="h-4 w-4" />,
      });
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (shouldSaveCustomerDetails) {
      try {
        localStorage.setItem("customer-details", JSON.stringify(data));
      } catch (error) {}
    }
    handleSubmit();
  }

  return savedCustomerDetails ? (
    <SavedCustomerDetails
      details={savedCustomerDetails}
      isButtonDisabled={mutation.isPending || !hasSelectedAppointment}
      isSubmitting={mutation.isPending}
      onClick={() => handleSubmit()}
      onEditClick={() => setSavedCustomerDetails(null)}
    />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {!savedCustomerDetails && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-[50%]">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[50%]">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Snow" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jon.snow@thenorth.co" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="+233 123 456 789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="w-full flex justify-end gap-8 items-center">
          {!savedCustomerDetails && (
            <div className="flex items-center space-x-2">
              <Switch
                id="customer-details"
                checked={shouldSaveCustomerDetails}
                onCheckedChange={setShouldSaveCustomerDetails}
              />
              <Label htmlFor="customer-details">Save details</Label>
            </div>
          )}
          <div
            className={`${!hasSelectedAppointment ? "cursor-not-allowed" : ""}`}
          >
            <LoadingButton
              isLoading={mutation.isPending}
              disabled={mutation.isPending || !hasSelectedAppointment}
              type="submit"
            >
              Book appointment
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
