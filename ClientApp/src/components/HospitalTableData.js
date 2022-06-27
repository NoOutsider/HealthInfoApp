import React, { Component, useReducer } from 'react';

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
}

const HospitalTableData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    dataList: [], loading: false
  }, initData);

  const renderHospitalTable = (dataList) => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>암호화요양기호</th>
            <th style={{ width: "200px" }}>요양기관명</th>
            <th>종별코드</th>
            <th>종별코드명</th>
            <th>시도코드</th>
            <th>시도코드명</th>
            <th>시군구코드</th>
            <th>시군구코드명</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>병원URL</th>
            <th>개설일자</th>
            <th>총의사수</th>
            <th>X좌표</th>
            <th>Y좌표</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map(data =>
            <tr key={data.col01}>
              <td>{data.col02}</td>
              <td>{data.col03}</td>
              <td>{data.col04}</td>
              <td>{data.col05}</td>
              <td>{data.col06}</td>
              <td>{data.col07}</td>
              <td>{data.col08}</td>
              <td>{data.col09}</td>
              <td>{data.col10}</td>
              <td>{data.col11}</td>
              <td>{data.col12}</td>
              <td>{data.col13}</td>
              <td>{data.col14}</td>
              <td>{data.col15}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  async function initData() {
    const response = await fetch('HospitalData/AllList');
    dispatch({
      type: ACTION_TYPE.ALL_LIST,
      dataList: await response.json(),
      loading: true
    });
  }

  let contents = !state.loading
    ? <p><em>Loading...</em></p>
    : renderHospitalTable(state.dataList);

  return (
    <div>
      <h1 id="tabelLabel" >HospitalData</h1>
      {contents}
    </div>
  );
};

export default HospitalTableData;

