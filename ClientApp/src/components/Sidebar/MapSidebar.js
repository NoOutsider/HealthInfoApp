import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";
import "./MapSidebar.css";

const MapSidebar = ({ width = 280, children }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%" }}
      >
        <ul id="category">
          <li id="HP" data-order="0">
            <img id="img" src="images/hospitalIcon.png" width="30px" alt="" />
            <span>병원</span>
          </li>
          <li id="PM" data-order="1">
            <img id="img" src="images/pharmacyIcon.png" width="30px" alt="" />
            <span>약국</span>
          </li>
        </ul>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MapSidebar;
