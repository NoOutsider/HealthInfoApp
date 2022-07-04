import React, { useEffect, useState, useReducer, useCallback } from "react";
import HeaderDetailCondition from "./HeaderDetailCondition";
import "./HeaderIllness.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const HeaderMenu = () => {
  const [startDate, setStartDate] = useState(new Date("2017/01/01"));
  const [endDate, setEndDate] = useState(new Date("2021/10/01"));

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
            onChange={handleMenuSelect}
          />
          요양기관그룹별
          <br />
          <input
            type={"radio"}
            name="menu"
            value="genderoutPatient"
            onChange={handleMenuSelect}
          />
          성별입원외래별
          <input
            type={"radio"}
            name="menu"
            value="genderTenAge"
            onChange={handleMenuSelect}
          />
          성별연령10세구간
          <br />
          <input
            type={"radio"}
            name="menu"
            value="genderFiveAge"
            onChange={handleMenuSelect}
          />
          성별연령5세구간
        </fieldset>
      </div>
      <HeaderDetailCondition visible={visible}/>
    </div>
  );
};

export default HeaderMenu;
