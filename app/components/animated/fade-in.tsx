"use client";
import { containerVariants } from "@/lib/constants";
import { motion } from "framer-motion";

export const FadeIn = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};
