import React, { useState, useRef, useCallback } from "react";
import styles from "./Sidebar.module.css";
import SidebarDetailCondition from "./SidebarDetailCondition";

const SidebarIllness = ({ width = 280 }) => {
  const [illnessName, setIllnessName] = useState("");
  const [visible, setVisible] = useState("");
  const handleMenuSelect = useCallback(
    (e) => {
      setVisible(e.target.value);
      console.log(visible);
    },
    [visible]
  );
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

        <div className="illnessPageHeader">
          <div className="searchConditionHeader">
            <fieldset>
              <legend>메뉴</legend>
              <input
                type={"radio"}
                name="menu"
                value="nursingHomeLocation"
                onClick={handleMenuSelect}
              />
              요양기관소재지별
              <input
                type={"radio"}
                name="menu"
                value="nursingHomeGroup"
                onClick={handleMenuSelect}
              />
              요양기관그룹별
              <br />
              <input
                type={"radio"}
                name="menu"
                value="genderoutPatient"
                onClick={handleMenuSelect}
              />
              성별입원외래별
              <input
                type={"radio"}
                name="menu"
                value="genderTenAge"
                onClick={handleMenuSelect}
              />
              성별연령10세구간
              <br />
              <input
                type={"radio"}
                name="menu"
                value="genderFiveAge"
                onClick={handleMenuSelect}
              />
              성별연령5세구간
            </fieldset>
          </div>
          {visible && <SidebarDetailCondition visible={visible} />}
          {/* <button onClick={onSubmit}/> */}
        </div>
      </div>
    </div>
  );
};

export default SidebarIllness;
