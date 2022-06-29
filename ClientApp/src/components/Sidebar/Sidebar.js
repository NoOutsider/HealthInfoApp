import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";


const Sidebar = ({ width = 280, children }) => {



  return (
    <div className={styles.container}>
      <div className={styles.sidebar} style={{ width: `${width}px`, height: '100%' }}>
        <button id="getMyPositionBtn" className={styles.sidebarButton}>
          내 위치 가져오기
        </button>
        <div className="header_option">구독과 좋아요</div>

        <div className={styles.content}>{children}</div>

      </div>
    </div>
  );
};


export default Sidebar;