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

const PharmacyTableData = () => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    initData
  );

  const renderPharmacyTable = (dataList) => {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>", dataList);
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>이름</th>
            <th>시도코드</th>
            <th>시도코드명</th>
            <th>시군구코드</th>
            <th>시군구코드명</th>
            <th>읍면동</th>
            <th>우편번호</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>개설일자</th>
            <th>X좌표</th>
            <th>Y좌표</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            <tr key={data.이름}>
              <td>{data.이름}</td>
              <td>{data.시도코드}</td>
              <td>{data.시도코드명}</td>
              <td>{data.시군구코드}</td>
              <td>{data.시군구코드명}</td>
              <td>{data.읍면동}</td>
              <td>{data.우편번호}</td>
              <td>{data.주소}</td>
              <td>{data.전화번호}</td>
              <td>{data.개설일자}</td>
              <td>{data.x좌표}</td>
              <td>{data.y좌표}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  async function initData() {
    const response = await fetch("PharmacyData/AllList");
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
    renderPharmacyTable(state.dataList)
  );

  return (
    <div>
      <h1 id="tabelLabel">PharmacyData</h1>
      {contents}
    </div>
  );
};

export default PharmacyTableData;
