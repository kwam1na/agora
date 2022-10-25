import InputContainer from "@/components/input-container";
import { Text, TextInput } from "@mantine/core";
import styles from "./inventoryInput.module.scss";

const InventoryInput = () => {
  return (
    <InputContainer>
      <div className={styles.content}>
        <div className={styles.title}>
          <Text>Inventory</Text>
        </div>
        <div className={styles.skuField}>
          <TextInput
            label="SKU (Stock Keeping Unit)"
            description={
              "if none is provided, we will auto-generate one for you"
            }
          />
        </div>
      </div>
    </InputContainer>
  );
};

export default InventoryInput;
