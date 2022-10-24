import React from "react";
import styles from "./inputcontainer.module.scss";

const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default InputContainer;
