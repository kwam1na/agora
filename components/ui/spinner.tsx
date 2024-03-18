import { Icons } from "@/app/components/Icons";

export const Spinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClass =
    size == "sm" ? "h-4 w-4" : size == "md" ? "h-8 w-8" : "h-12 w-12";

  return <Icons.spinner className={`ml-2 ${sizeClass} animate-spin`} />;
};
