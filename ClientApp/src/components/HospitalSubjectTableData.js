import React, { Component, useReducer } from "react";

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

const HospitalSubjectTableData = () => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    initData
  );

  const renderHospitalSubjectTable = (dataList) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>", dataList);
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        {/* <thead>
          <tr>
            <th>진료과목코드명</th>
            <th>특수병원코드명</th>
            <th>장비코드명</th>
            <th>특수진료코드명</th>
          </tr>
        </thead> */}
        <tbody>
          {dataList.map((row, idx) => (
            <tr key={idx}>
              {/* {row} */}
              {row.map((col) => (
                <td> {col} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderHospitalSubjectTable(state.dataList)
  );

  return (
    <div>
      <h1 id="tabelLabel">HospitalSearchListData</h1>
      {contents}
    </div>
  );
};

export default HospitalSubjectTableData;
