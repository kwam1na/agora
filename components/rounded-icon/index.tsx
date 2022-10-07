import { CSSProperties } from "react";
import { ReactElement } from "react";
import styles from "./rounded-icon.module.scss";

const RoundedIcon = ({
  width,
  icon,
}: {
  width: number;
  icon: ReactElement;
}) => {
  const containerStyle: CSSProperties = {
    width: `${width}px`,
    borderRadius: "50%",
    background: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={containerStyle}>
      <div className={styles.iconContainer}>{icon}</div>
    </div>
  );
};

export default RoundedIcon;
