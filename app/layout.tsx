import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactQueryClientProvider } from "./components/react-query-client-provider";
import { AppointmentSelectorProvider } from "./components/appointment-selector-provider";
import { Header } from "./components/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Wigclub - Book an appointment",
  description: "Book an appointment for a service at Wigclub",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <ReactQueryClientProvider>
        <AppointmentSelectorProvider>
          <body>
            <Header />
            <main className="px-8 lg:px-16 py-8">{children}</main>
            <Toaster />
          </body>
        </AppointmentSelectorProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
