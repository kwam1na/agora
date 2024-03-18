"use client";

import { ATHENA_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, Store } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const shopQuery = useQuery({
    queryKey: ["shop-data"],
    queryFn: () =>
      fetch(`${ATHENA_URL}/api/v1/stores/1`).then((res) => res.json()),
  });

  return (
    <div className="w-full h-12 bg-white flex items-center justify-between border-b px-8">
      <Link href={"/"} className="flex items-center">
        <Store className="w-4 h-4 mr-2" />
        <p className="text-sm font-medium">{shopQuery?.data?.name}</p>
      </Link>
      <Link href={"/appointments"} className="flex items-center">
        <CalendarCheck className="w-4 h-4 mr-2" />
        <p className="text-sm font-medium">My appointments</p>
      </Link>
    </div>
  );
};
