import React, { useEffect } from "react";

const HeaderDetailCondition = ({ visible }) => {
  return (
    <div className="searchConditionDetailHeader">
      <div>
        기간
        <input
          style={{ width: "250px" }}
          placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26"
        />
        {/* <DatePicker
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
      /> */}
        -
        <input
          style={{ width: "250px" }}
          placeholder="입력 예시) 2022년 7월 26일 -> 22/07/26"
        />
        {/* <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        isClearable
        placeholderText="날짜를 선택해주세요"
        startDate={new Date(startDate)}
        endDate={endDate}
      /> */}
      </div>
      {visible === "genderoutPatient" && (
        <div>
          성별
          <input type={"checkbox"} />
          여성
          <input type={"checkbox"} />
          남성
        </div>
      )}
      {visible === "genderTenAge" && (
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
      {visible === "nursingHomeLocation" && (
        <div>
          지역
          <input type={"checkbox"} />
        </div>
      )}
    </div>
  );
};

export default HeaderDetailCondition;
