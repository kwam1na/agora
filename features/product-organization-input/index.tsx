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
          <TextInput
            label="Product Category"
            placeholder="e.g, Wigs"
            required
          />
        </div>
        <div className={styles.typeField}>
          <TextInput
            label="Product Subcategory"
            placeholder="e.g, Closures"
            required
          />
        </div>
        <div className={styles.typeField}>
          <TextInput
            label="Product Type"
            placeholder="e.g, Human hair"
            required
          />
        </div>
        <div className={styles.colorField}>
          <TextInput label="Product Color" required />
        </div>
        <div className={styles.vendorField}>
          <TextInput label="Vendor" required />
        </div>
      </div>
    </InputContainer>
  );
};

export default ProductOrganizationInput;
