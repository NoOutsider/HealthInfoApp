import React, { useReducer } from "react";
import "./HospitalSubjectData.css";

const ACTION_TYPE = {
  ALL_LIST: 1,
};
Object.freeze(ACTION_TYPE);

const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ALL_LIST:
      return { dataList: action.dataList, loading: action.loading };
    default:
      return state;
  }
};

const HospitalSubjectData = ({ onSelect }) => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    initData
  );

  const renderHospitalSubjectData = (dataList) => {
    return (
      <div>
        <fieldset className="SearchHP">
          <legend>병원 정보 검색</legend>
          {dataList.map((row, idx) => {
            if (idx === 0) {
              return (
                <fieldset id="SearchHPChild">
                  <legend>진료과목</legend>
                  <select id="subject" onChange={onSelect}>
                    <option value="none">=== 선택해주세요 ===</option>
                    {row.map((col) => {
                      return (
                        <option value={col} key={col}>
                          {col}
                        </option>
                      );
                    })}
                  </select>
                </fieldset>
              );
            } else if (idx === 1) {
              return (
                <fieldset id="SearchHPChild">
                  <legend>전문병원지정분야</legend>
                  {row.map((col) => (
                    <div key={col}>
                      <input
                        onClick={onSelect}
                        id="specialHP"
                        name="specialHP"
                        type="radio"
                        value={col}
                      />
                      {col}
                    </div>
                  ))}
                </fieldset>
              );
            } else if (idx === 2) {
              return (
                <fieldset id="SearchHPChild">
                  <legend>의료장비</legend>
                  {row.map((col) => (
                    <div key={col}>
                      <input
                        onClick={onSelect}
                        id="medicalEQ"
                        name="medicalEQ"
                        type="radio"
                        value={col}
                      />
                      {col}
                    </div>
                  ))}
                </fieldset>
              );
            } else if (idx === 3) {
              return (
                <fieldset id="SearchHPChild">
                  <legend>특수진료</legend>
                  <select id="specialTreat" onChange={onSelect}>
                    <option value="none">
                      ========= 선택해주세요 =========
                    </option>
                    {row.map((col) => {
                      return (
                        <option value={col} key={col}>
                          {col}
                        </option>
                      );
                    })}
                  </select>
                </fieldset>
              );
            }
          })}
        </fieldset>
      </div>
    );
  };

  async function initData() {
    const response = await fetch("HospitalSearchListData/AllList");
    dispatch({
      type: ACTION_TYPE.ALL_LIST,
      dataList: await response.json(),
      loading: true,
    });
  }

  let contents = !state.loading ? (
    <p></p>
  ) : (
    renderHospitalSubjectData(state.dataList)
  );

  return <div>{contents}</div>;
};

export default HospitalSubjectData;
