import { CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import wigclubLogo from "./wigclub-logo.png";

export const Header = () => {
  return (
    <div className="w-full h-[64px] bg-white flex items-center justify-between border-b px-8">
      <Link href={"/"} className="flex items-center">
        <Image src={wigclubLogo} width={64} height={64} alt="wigclub logo" />
      </Link>
      <Link href={"/appointments"} className="flex items-center">
        <CalendarCheck className="w-4 h-4 mr-2" />
        <p className="text-sm font-medium">My appointments</p>
      </Link>
    </div>
  );
};
