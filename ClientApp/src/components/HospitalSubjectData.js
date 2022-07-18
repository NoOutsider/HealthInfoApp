import React, { useReducer } from "react";

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

const HospitalSubjectData = () => {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    initData
  );

  const renderHospitalSubjectData = (dataList) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>", dataList);
    return dataList.map((row, idx) => {
      console.log("row???????????????????", row);
      console.log("idx>>>>>>>>>>>>>>>>>>>>", idx);
      if ((idx = 1)) {
        return (
          <select>
            {row.map((col) => {
              console.log("col????????????????", col);
              return <option>{col}</option>;
            })}
          </select>
        );
      }
      // else {
      //   return (
      //     <select>
      //       {row.map((col) => {
      //         console.log("col????????????????", col);
      //         return <option>{col}</option>;
      //       })}
      //     </select>
      //   );
      // }
    });
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
    renderHospitalSubjectData(state.dataList)
  );

  return (
    <div>
      <h1 id="tabelLabel">HospitalSearchListData</h1>
      {contents}
    </div>
  );
};

export default HospitalSubjectData;
