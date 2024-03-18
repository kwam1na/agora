import { AppointmentsNavBar } from "../components/appointments-header";

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
