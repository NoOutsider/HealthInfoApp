import React, { useReducer } from "react";

const ACTION_TYPE = {
  xyPos: 1,
};
Object.freeze(ACTION_TYPE);

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.xyPos:
      return {
        ...state,
        dataList: action.dataList,
        loading: action.loading,
      };
    default:
      return state;
  }
};
const XYPOSITION = () => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      dataList: [],
      loading: false,
    },
    initData
  );

  async function initData() {
    fetch("HospitalSearchListData/xyPosition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        진료과목코드명: "영상의학과",
        특수병원검색코드명: "",
        장비코드명: "",
        특수진료검색코드명: "",
      }),
    })
      .then((response) => response.json())
      .then((dataList) => {
        dispatch({
          type: ACTION_TYPE.xyPos,
          dataList: dataList,
          loading: true,
        });
      });
  }

  const rendering = (dataList) => {
    // return (
    //   <div>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>x축</th>
    //           <th>y축</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>{dataList.xPosition}</td>
    //           <td>{dataList.yPosition}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // );
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>x축</th>
              <th>y축</th>
            </tr>
          </thead>
          {dataList.map((data) => {
            return (
              <tbody>
                <tr>
                  <td>{data.xPosition}</td>
                  <td>{data.yPosition}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  };
  let contents = !state.loading ? (
    <em>Loading...</em>
  ) : (
    rendering(state.dataList)
  );

  return (
    <div>
      <h1>{contents}</h1>
    </div>
  );
};

export default XYPOSITION;
