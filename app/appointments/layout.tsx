import { Metadata } from "next";
import { AppointmentsNavBar } from "../components/appointments-header";

export const metadata: Metadata = {
  title: "Wigclub - My appointments",
  description: "View your upcoming and past service appointments at Wigclub",
};

export default function AppointmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="space-y-4 pb-24">
      <AppointmentsNavBar />
      <div>{children}</div>
    </section>
  );
}
