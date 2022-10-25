import InputContainer from "@/components/input-container";
import { NumberInput, Text } from "@mantine/core";
import styles from "./pricingInput.module.scss";
import * as React from "react";

const PricingInput = () => {
  const [price, setPrice] = React.useState<number | undefined>(undefined);
  const [cost, setCost] = React.useState<number | undefined>(undefined);
  const [error, setError] = React.useState("");
  const [margin, setMargin] = React.useState("");
  const [profit, setProfit] = React.useState("");

  const handleCPIChange = (value?: number) => {
    // console.log("Value, cost and price =>", value, cost, price);
    if (value && price) {
      setCost(value);
      const profit = price - value;
      setProfit(`${profit}`);
      const margin = (profit / price) * 100;
      setMargin(`${margin.toFixed(2)}`);
    } else {
      setProfit("");
      setMargin("");
    }
  };

  const updateMargins = (newPrice: number) => {
    console.log("Cost and new price =>", cost, newPrice);
    if (cost) {
      const profit = newPrice - cost;
      setProfit(`${profit}`);
      const margin = (profit / newPrice) * 100;
      setMargin(`${margin.toFixed(2)}`);
    } else {
      setProfit("");
      setMargin("");
    }
  };

  const handlePriceChange = (value: number) => {
    setError("");
    setPrice(value);
    if (!value) {
      setError("Price cannot be blank");
      setCost(undefined);
      setProfit("");
      setMargin("");
    }
    updateMargins(value);
  };

  return (
    <InputContainer>
      <div className={styles.content}>
        <div className={styles.title}>
          <Text>Pricing</Text>
          <div className={styles.price}>
            <NumberInput
              label="Price"
              placeholder="0.00"
              value={price}
              error={error}
              onChange={handlePriceChange}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value ?? ""))
                  ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ``
              }
              hideControls
              required
            />
          </div>
          {price && (
            <div className={styles.margin}>
              <NumberInput
                label="Cost per item"
                value={cost}
                onChange={handleCPIChange}
                placeholder="0.00"
                description="Customers will not see this"
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value ?? ""))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ``
                }
                hideControls
              />

              {price && profit && (
                <div className={styles.marginData}>
                  <div className={styles.marginInfo}>
                    <Text color={"dimmed"}>Margin</Text>
                    <Text>{`${margin}%`}</Text>
                  </div>
                  <div className={styles.marginInfo}>
                    <Text color={"dimmed"}>Profit</Text>
                    <Text>{`$${profit}`}</Text>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </InputContainer>
  );
};

export default PricingInput;
