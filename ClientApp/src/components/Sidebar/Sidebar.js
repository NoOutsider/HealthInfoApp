import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ width = 280, children }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%" }}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
