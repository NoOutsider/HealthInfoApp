import React, { useState, useRef, useCallback, useReducer } from "react";
import styles from "./Sidebar.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const SidebarIllness = ({ width = 280 }) => {
  const [form, setForm] = useState({
    // visible:"",
    illnessName: "흡연",
    menuName: "STATE",
    startDate: "2017-01-01",
    endDate: "2021-10-01",
    item: "환자수",
    gender: "",
    age: "",
    ioPatient: "",
    nursingHome: "",
    locatino: "서울",
  });

  const onSelect = useCallback(
    (e) => {
      console.log("onSelect() ...");
      getServerDataLoad(e.target.name, e.target.value);
    },
    [form]
  );

  const getServerDataLoad = useCallback(
    (name, value) => {
      const newForm = {
        ...form,
        [name]: value,
      };
      setForm(newForm);

      console.log("getServerDataLoad() ...", newForm);

      fetch("AllillnessData/Get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visible: newForm.visible,
          illnessName: newForm.illnessName,
          menuName: newForm.menuName,
          startDate: newForm.startDate,
          endDate: newForm.endDate,
          item: newForm.item,
          gender: newForm.gender,
          age: newForm.age,
          ioPatient: newForm.ioPatient,
          nursingHome: newForm.nursingHome,
          location: newForm.location,
        }),
      })
        .then((searchParam) => searchParam.json())
        .then((searchParam) => {})
        .catch((ex) => {
          alert("네트웍 문제로 인하여 처리할 수 없습니다");
        });
    },
    [form]
  );

  // const onStartDateChange = (date) => {
  //   getServerDataLoad("startDate", date.toString());
  // };

  // const onEndDateChange = (date) => {
  //   getServerDataLoad("endDate", date.toString());
  // };

  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%" }}
      >
        <form>
          <div id="질병명">
            <input
              type={"radio"}
              name="illnessName"
              value="흡연"
              onClick={onSelect}
            />
            흡연(니코틴 중독)
            <input
              type={"radio"}
              name="illnessName"
              value="거북목"
              onClick={onSelect}
            />
            거북목
            <input
              type={"radio"}
              name="illnessName"
              value="관절염"
              onClick={onSelect}
            />
            관절염
            <input
              type={"radio"}
              name="illnessName"
              value="오십견"
              onClick={onSelect}
            />
            오십견
            <input
              type={"radio"}
              name="illnessName"
              value="당뇨"
              onClick={onSelect}
            />
            당뇨
          </div>
          <div className="illnessPageHeader">
            <div className="searchConditionHeader" id="menu">
              <fieldset>
                <legend>메뉴</legend>
                <input
                  id="menu"
                  type="radio"
                  name="menuName"
                  value="tb_allillness_nursinghome_location"
                  onClick={onSelect}
                />
                요양기관소재지별
                <input
                  type="radio"
                  name="menuName"
                  value="tb_allillness_nursinghome_group"
                  onClick={onSelect}
                />
                요양기관그룹별
                <br />
                <input
                  type="radio"
                  name="menuName"
                  value="tb_allillness_gender_outpatient"
                  onClick={onSelect}
                />
                성별입원외래별
                <input
                  type="radio"
                  name="menuName"
                  value="tb_allillness_gender_ten_years"
                  onClick={onSelect}
                />
                성별연령10세구간 combobox..
                <br />
                <input
                  type="radio"
                  id="menu"
                  name="menuName"
                  value="tb_allillness_gender_five_years"
                />
                성별연령5세구간
              </fieldset>
            </div>
          </div>

          <div className="searchConditionDetailHeader">
            <div>
              기간
              {/* <DatePicker
 startDate={form.startDate} */}
              -
            </div>
            <div>
              항목
              <input
                type={"checkbox"}
                name="item"
                value="환자수"
                onClick={onSelect}
              />
              환자수
              <input
                type={"checkbox"}
                name="item"
                value="내원일수"
                onClick={onSelect}
              />
              내원일수
              <input
                type={"checkbox"}
                name="item"
                value="청구건수"
                onClick={onSelect}
              />
              청구건수
              <input
                type={"checkbox"}
                name="item"
                value="요양급여비용총액"
                onClick={onSelect}
              />
              요양급여비용총액
              <input
                type={"checkbox"}
                name="item"
                value="보험자부담금"
                onClick={onSelect}
              />
              보험자부담금
            </div>

            <div>
              성별
              <input
                type={"checkbox"}
                name="gender"
                value="female"
                onClick={onSelect}
              />
              여성
              <input
                type={"checkbox"}
                name="gender"
                value="male"
                onClick={onSelect}
              />
              남성
            </div>

            <div>
              연령대
              <input
                type={"checkbox"}
                name="age"
                value="tenAge"
                onClick={onSelect}
              />
              10세 콤보박스..
              <input
                type={"checkbox"}
                name="age"
                value="fiveAge"
                onClick={onSelect}
              />
              5세 콤보박스..
            </div>

            <div>
              입원외래별
              <input
                type={"checkbox"}
                name="ioPatient"
                value="입원"
                onClick={onSelect}
              />
              입원
              <input
                type={"checkbox"}
                name="ioPatient"
                value="외래"
                onClick={onSelect}
              />
              외래
            </div>

            <div>
              요양기관
              <input
                type={"checkbox"}
                name="nursingHome"
                value="상급종합병원"
                onClick={onSelect}
              />
              상급종합병원
              <input
                type={"checkbox"}
                name="nursingHome"
                value="종합병원"
                onClick={onSelect}
              />
              종합병원
              <input
                type={"checkbox"}
                name="nursingHome"
                value="병원급"
                onClick={onSelect}
              />
              병원급
              <input
                type={"checkbox"}
                name="nursingHome"
                value="의원급"
                onClick={onSelect}
              />
              의원급
              <input
                type={"checkbox"}
                name="nursingHome"
                value="보건기관등"
                onClick={onSelect}
              />
              보건기관등
            </div>

            <div>
              지역
              <input type={"checkbox"} name="location" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SidebarIllness;
