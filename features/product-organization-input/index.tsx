import InputContainer from "@/components/input-container";
import { Text, TextInput } from "@mantine/core";
import styles from "./productOrganizationInput.module.scss";

const ProductOrganizationInput = () => {
  return (
    <InputContainer>
      <div className={styles.content}>
        <div className={styles.title}>
          <Text>Product Organization</Text>
        </div>
        <div className={styles.categoryField}>
          <TextInput label="Product Category" placeholder="e.g, Closures" />
        </div>
        <div className={styles.typeField}>
          <TextInput label="Product Type" placeholder="e.g, Wig" />
        </div>
        <div className={styles.colorField}>
          <TextInput label="Product Color" />
        </div>
        <div className={styles.vendorField}>
          <TextInput label="Vendor" />
        </div>
      </div>
    </InputContainer>
  );
};

export default ProductOrganizationInput;
