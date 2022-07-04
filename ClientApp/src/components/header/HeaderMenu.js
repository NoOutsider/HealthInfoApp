import React, { useEffect, useState, useReducer, useCallback } from "react";
import HeaderDetailCondition from "./HeaderDetailCondition";
import "./HeaderIllness.css";

const HeaderMenu = () => {
  const [visible, setVisible] = useState("");
  const handleMenuSelect = useCallback(
    (e) => {
      setVisible(e.target.value);
      console.log(visible);
    },
    [visible]
  );

  return (
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
      {visible && <HeaderDetailCondition visible={visible} />}
    </div>
  );
};

export default HeaderMenu;
