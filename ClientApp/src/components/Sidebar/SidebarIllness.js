import React, { useState, useRef } from "react";
import styles from "./Sidebar.module.css";

const SidebarIllness = ({ width = 280, children }) => {
  const [illnessName, setIllnessName] = useState("");
  const inputEl = useRef(null);

  const inputIllnessName = (e) => {
    setIllnessName(e.target.value);
    console.log(illnessName);
  };
  const searchIllnessName = () => {
    alert(illnessName);
    setIllnessName("");
    inputEl.current.focus();
  };
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      searchIllnessName();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%" }}
      >
        <input
          className={styles.inputIllnessName}
          ref={inputEl}
          value={illnessName}
          name="illnessName"
          placeholder="질병명을 입력하세요"
          onChange={inputIllnessName}
          onKeyPress={pressEnter}
          style={{ height: "30px" }}
        />
        <button onClick={searchIllnessName}>확인</button>

        <p>질병명1</p>
        <p>질병명2</p>
        <p>질병명3</p>
        <p>질병명4</p>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default SidebarIllness;
