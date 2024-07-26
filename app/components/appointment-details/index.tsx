"use client";

import { Button } from "@/components/ui/button";
import { AppointmentDetails } from "../containers/appointment-booker";
import { useRouter } from "next/navigation";
import { useAppointmentSelector } from "../appointment-selector-provider";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/constants";

export const AppointmentDetailsScreen = () => {
  const router = useRouter();
  const { clear, storePhoneNumber } = useAppointmentSelector();
  return (
    <motion.div
      className="p-8 space-y-4 h-[380px] w-full md:w-[50%] xl:w-[25%] border border-1 rounded-md bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-md text-grey-900">See you soon!</h2>
      <p className="text-sm text-grey-800">
        We sent an email with all the details of your appointment.
      </p>
      <div className="flex flex-col gap-8">
        <AppointmentDetails />
        <div className="w-full flex flex-col gap-2">
          <a href={`tel:${storePhoneNumber}`}>
            <Button className="w-full" variant={"outline"}>
              Call store
            </Button>
          </a>

          <Button
            onClick={() => {
              router.replace("/");
              setTimeout(() => {
                clear();
              }, 750);
            }}
          >
            Book another appointment
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
