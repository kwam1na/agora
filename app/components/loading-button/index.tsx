import { Button, ButtonProps } from "@/components/ui/button";
import * as React from "react";
import { Icons } from "../Icons";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      {children}
      {isLoading && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};
