import InputContainer from "@/components/input-container";
import { Textarea, TextInput } from "@mantine/core";
import styles from "./productTitleAndDescriptionInput.module.scss";

const ProductTitleAndDescriptionInput = () => {
  return (
    <>
      <InputContainer>
        <div className={styles.content}>
          <div className={styles.title}>
            <TextInput label="Title" placeholder="Black closure" />
          </div>
          <div className={styles.description}>
            <Textarea label="Description" autosize />
          </div>
        </div>
      </InputContainer>
    </>
  );
};

export default ProductTitleAndDescriptionInput;
