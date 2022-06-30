import React from "react";
import "./HeaderIllness.css";

const HeaderIllness = () => {
  return (
    <div className="illnessPageHeader">
      <div className="searchConditionHeader">
        <input type={"radio"} name="id" />
        요양기관소재지별
        <br />
        <input type={"radio"} name="id" />
        요양기관그룹별
        <br />
        <input type={"radio"} name="id" />
        성별입원외래별
        <br />
        <input type={"radio"} name="id" />
        성별연령10세구간
        <br />
        <input type={"radio"} name="id" />
        성별연령5세구간
      </div>
      <div className="searchConditionDetailHeader">
        <div>
          성별
          <input type={"checkbox"} />
          여성
          <input type={"checkbox"} />
          남성
        </div>
        <div>
          연령대
          <input type={"checkbox"} />
          10세
          <input type={"checkbox"} />
          5세
        </div>
        <div>
          지역
          <input type={"checkbox"} />
        </div>
        <div>
          기간
          <input placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26" />
          -
          <input placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26" />
        </div>
      </div>
    </div>
  );
};

export default HeaderIllness;
