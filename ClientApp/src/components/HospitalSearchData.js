import React, { useReducer, useCallback } from "react";

const ACTION_TYPE = {
  X_Y_Position: 1,
};
Object.freeze(ACTION_TYPE);

const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.X_Y_Position:
      return { dataList: action.dataList, loading: action.loading };
    default:
      return state;
  }
};

function HospitalSearchData() {
  const [state, dispatch] = useReducer(
    dataReducer,
    {
      dataList: [],
      loading: false,
    },
    initData
  );

  async function initData() {
    const response = await fetch("HospitalSubjectData/xyPosition");
    dispatch({
      type: ACTION_TYPE.X_Y_Position,
      dataList: await response.json(),
      loading: true,
    });
  }

  const onSelect = useCallback((e) => {
    console.log("state = ", state);

    dispatch({
      type: ACTION_TYPE.CHANGE_VALUE,
      action: e.target,
    });

    const newState = {
      illnessName: document.getElementById("illnessName").value,
      menuName: document.getElementById("menuName").value,
      item: document.getElementById("item").value,
      gender: document.getElementById("gender").value,
      age_5: document.getElementById("age_5").value,
      age_10: document.getElementById("age_10").value,
      ioPatient: document.getElementById("ioPatient").value,
      nursingHome: document.getElementById("nursingHome").value,
      location: document.getElementById("location").value,
    };

    console.log("newState=", newState);
    console.log("state=", state);

    fetch("AllillnessData/resetChartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newState),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ACTION_TYPE.chartType,
          chartLabels: data.chartLabels,
          chartData: data.chartData,
          chartLoading: true,
        });
      });
  });

  return (
    <div className="showData">
      <SidebarTemplate state={state} onSelect={onSelect} />
      <ShowChart state={state} />
    </div>
  );
}

export default HospitalSearchData;
