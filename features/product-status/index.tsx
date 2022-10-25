import InputContainer from "@/components/input-container";
import { Text, Select, Avatar, Group } from "@mantine/core";
import styles from "./productStatus.module.scss";
import * as React from "react";

const ProductStatus = () => {
  const data = [
    { label: "Available", value: "available" },
    { label: "Low in stock", value: "lowInStock" },
    { label: "Sold out", value: "soldOut" },
  ];

  return (
    <InputContainer>
      <div className={styles.content}>
        <div className={styles.title}>
          <Select
            data={data}
            label="Product Availability"
            defaultValue={data[0].value}
          />
        </div>
      </div>
    </InputContainer>
  );
};

export default ProductStatus;
