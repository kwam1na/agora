import { Button } from "@mantine/core";
import styles from "./headerButtons.module.scss";

const HeaderButtons = ({
  onPrimaryClick,
  onSecondaryClick,
}: {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}) => {
  return (
    <div className={styles.container}>
      <Button onClick={onSecondaryClick} variant="outline" color={"gray"}>
        Discard
      </Button>
      <Button onClick={onPrimaryClick}>Save</Button>
    </div>
  );
};

export default HeaderButtons;
