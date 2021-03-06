import React from "react";
import SidebarIllnessName from "./SidebarIllnessName";
import styles from "./Sidebar.module.css";
import SidebarMenuName from "./SidebarMenuName";
import SidebarDetail from "./SidebarDetail";

const SidebarTemplate = ({ state, onSelect }) => {
  return (
    <div className={styles.containter}>
      <div
        className={styles.sidebar}
        style={{ width: "280px", height: "100%" }}
      >
        <fieldset>
          <legend>질병명</legend>
          <SidebarIllnessName state={state} onSelect={onSelect} />
        </fieldset>
        <fieldset>
          <legend>메뉴</legend>
          <SidebarMenuName state={state} onSelect={onSelect} />
        </fieldset>
        <fieldset>
          <legend>상세조건</legend>
          <SidebarDetail state={state} onSelect={onSelect} />
        </fieldset>
      </div>
    </div>
  );
};

export default SidebarTemplate;
