import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const SidebarDetailCondition = ({ visible, string, setString }) => {
  const [startDate, setStartDate] = useState(new Date("2017/01/01"));
  const [endDate, setEndDate] = useState(new Date("2021/10/01"));
  return (
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
        <input type={"checkbox"} value="환자수" />
        환자수
        <input type={"checkbox"} value="내원일수" />
        내원일수
        <input type={"checkbox"} value="청구건수" />
        청구건수
        <input type={"checkbox"} value="요양급여비용총액" />
        요양급여비용총액
        <input type={"checkbox"} value="보험자부담금" />
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
          지역 콤보박스..
          <input type={"checkbox"} />
        </div>
      )}
    </div>
  );
};

export default SidebarDetailCondition;
