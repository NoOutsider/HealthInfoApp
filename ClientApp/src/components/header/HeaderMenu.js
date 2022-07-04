import React, { useEffect, useState, useReducer, useCallback } from "react";
// import HeaderDetailCondition from "./HeaderDetailCondition";
import "./HeaderIllness.css";

function select(visible, selector) {
  return {
    ...visible,
    [selector.name]: true,
  };
}

const HeaderMenu = () => {
  // const [visible, setVisible] = useReducer(select, {
  //   nursingHomeLocation: false,
  //   nursingHomeGroup: false,
  //   genderoutPatient: false,
  //   genderTenAge: false,
  //   genderFiveAge: false,
  // });
  const [visible, setVisible] = useState({
    nursingHomeLocation: false,
    nursingHomeGroup: false,
    genderoutPatient: false,
    genderTenAge: false,
    genderFiveAge: false,
  });

  // useEffect(() => {
  //   return () => {
  //     const invisible = setVisible({
  //       nursingHomeLocation: false,
  //       nursingHomeGroup: false,
  //       genderoutPatient: false,
  //       genderTenAge: false,
  //       genderFiveAge: false,
  //     });
  //     setVisible(invisible);
  //   };
  // }, [visible]);

  const handleMenuSelect = useCallback(
    (e) => {
      // setVisible(e.target);
      setVisible({
        nursingHomeLocation: false,
        nursingHomeGroup: false,
        genderoutPatient: false,
        genderTenAge: false,
        genderFiveAge: false,
      });
      setVisible({ ...visible, [e.target.value]: true });
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
      {/* <HeaderDetailCondition visibleState={visible}></HeaderDetailCondition> */}

      <div className="searchConditionDetailHeader">
        <div>
          기간
          <input
            style={{ width: "250px" }}
            placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26"
          />
          -
          <input
            style={{ width: "250px" }}
            placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26"
          />
        </div>
        {visible.genderoutPatient && (
          <div>
            성별
            <input type={"checkbox"} />
            여성
            <input type={"checkbox"} />
            남성
          </div>
        )}
        {visible.genderTenAge && (
          <div>
            연령대
            <input type={"checkbox"} />
            10세
            <input type={"checkbox"} />
            5세
          </div>
        )}
        <div>
          입원외래별
          <input type={"checkbox"} />
          입원
          <input type={"checkbox"} />
          외래
        </div>
        <div>
          항목
          <input type={"checkbox"} />
          환자수
          <input type={"checkbox"} />
          내원일수
          <input type={"checkbox"} />
          청구건수
          <input type={"checkbox"} />
          요양급여비용총액
          <input type={"checkbox"} />
          보험자부담금
        </div>
        {visible.nursingHomeLocation && (
          <div>
            지역
            <input type={"checkbox"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMenu;
