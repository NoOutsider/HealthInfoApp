import React, { useState, useRef, useCallback } from "react";
import styles from "./Sidebar.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const SidebarIllness = ({ width = 280 }) => {
  const [illnessName, setIllnessName] = useState("");
  const [visible, setVisible] = useState("");
  const [startDate, setStartDate] = useState(new Date("2017/01/01"));
  const [endDate, setEndDate] = useState(new Date("2021/10/01"));
  const handleMenuSelect = useCallback(
    (e) => {
      setVisible(e.target.value);
      console.log(visible);
      let illnessName = document.getElementById("illnessName");
      let tableName = document.getElementById("menu");
      let condition = document.getElementById("menu2");
      fetch("AllillnessData/searchData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Param01: illnessName.value,
          Param02: tableName.value,
          Param03: "2017/01/01",
          Param04: "2021/01/01",
          Param05: condition.value,
        }),
      })
        .then((searchParam) => searchParam.json())
        .then((searchParam) => {
          console.log(searchParam);
        })
        .catch((ex) => {
          alert("네트웍 문제로 인하여 처리할 수 없습니다");
        });
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
        <div id="질병명">
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
          <input type={"radio"} name="illness" id="illnessName" value="흡연" />
          흡연(니코틴 중독)
          <input type={"radio"} name="illness" />
          거북목
          <input type={"radio"} name="illness" />
          관절염
          <input type={"radio"} name="illness" />
          오십견
          <input type={"radio"} name="illness" />
          당뇨
        </div>
        <div className="illnessPageHeader">
          <div className="searchConditionHeader" id="menu">
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
                value="TB_ALLILLNESS_NURSINGHOME_GROUP"
                onClick={handleMenuSelect}
              />
              요양기관그룹별
              <br />
              <input
                type={"radio"}
                name="menu"
                value="genderOutPatient"
                onClick={handleMenuSelect}
              />
              성별입원외래별
              <input
                type={"radio"}
                name="menu"
                value="genderTenAge"
                onClick={handleMenuSelect}
              />
              성별연령10세구간 combobox..
              <br />
              <input
                type={"radio"}
                id="menu"
                name="menu"
                value="genderFiveAge"
                onClick={handleMenuSelect}
              />
              성별연령5세구
            </fieldset>
          </div>
        </div>

        <div className="searchConditionDetailHeader">
          <div>
            기간
            {/* <input
          style={{ width: "250px" }}
          placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26"
        /> */}
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              isClearable
              placeholderText="날짜를 선택해주세요"
              mindate={new Date("2017/01/01")}
              startDate={startDate}
              endDate={new Date()}
            />
            -
            {/* <input
          style={{ width: "250px" }}
          placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26"
        /> */}
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              isClearable
              placeholderText="날짜를 선택해주세요"
              startDate={new Date(startDate)}
              endDate={endDate}
            />
          </div>
          <div>
            항목
            <input id="menu2" type={"checkbox"} value="환자수" />
            환자수
            <input id="menu2" type={"checkbox"} value="내원일수" />
            내원일수
            <input id="menu2" type={"checkbox"} value="청구건수" />
            청구건수
            <input id="menu2" type={"checkbox"} value="요양급여비용총액" />
            요양급여비용총액
            <input id="menu2" type={"checkbox"} value="보험자부담금" />
            보험자부담금
          </div>
          {visible.includes("gender") && (
            <div>
              성별
              <input type={"checkbox"} value="female" />
              여성
              <input type={"checkbox"} value="male" />
              남성
            </div>
          )}
          {visible.includes("Age") && (
            <div>
              연령대
              <input type={"checkbox"} value="tenAge" />
              10세 콤보박스..
              <input type={"checkbox"} value="fiveAge" />
              5세 콤보박스..
            </div>
          )}
          {visible.includes("OutPatient") && (
            <div>
              입원외래별
              <input type={"checkbox"} value="입원" />
              입원
              <input type={"checkbox"} value="외래" />
              외래
            </div>
          )}
          {visible.includes("Group") && (
            <div>
              요양기관
              <input type={"checkbox"} value="상급종합병원" />
              상급종합병원
              <input type={"checkbox"} value="종합병원" />
              종합병원
              <input type={"checkbox"} value="병원급" />
              병원급
              <input type={"checkbox"} value="의원급" />
              의원급
              <input type={"checkbox"} value="보건기관등" />
              보건기관등
            </div>
          )}
          {visible.includes("Location") && (
            <div>
              지역
              <input type={"checkbox"} />
            </div>
          )}
          {/* <button onClick={confirmCondition}>검색</button> */}
        </div>
      </div>
    </div>
  );
};

export default SidebarIllness;
