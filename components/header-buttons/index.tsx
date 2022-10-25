import { Button } from "@mantine/core";
import styles from "./headerButtons.module.scss";

const HeaderButtons = () => {
  return (
    <div className={styles.container}>
      <Button variant="outline">Discard</Button>
      <Button>Save</Button>
    </div>
  );
};

export default HeaderButtons;
