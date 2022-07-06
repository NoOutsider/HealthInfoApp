import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ width = 280, children }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%" }}
      >
        <button type="button" onclick="getCurrentPosBtn()">
          내 위치 가져오기
        </button>
        <div className={styles.content}>{children}</div>

      </div>
    </div>
  );
};

export default Sidebar;
