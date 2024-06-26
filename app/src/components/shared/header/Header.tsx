import React from "react";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}></div>
      <div className={styles.menu}></div>
    </div>
  );
};
