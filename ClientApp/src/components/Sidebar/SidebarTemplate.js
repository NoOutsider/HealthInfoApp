import React, { useCallback, useReducer } from "react";
import SidebarIllnessName from "./SidebarIllnessName";
import styles from "./Sidebar.module.css";
import SidebarMenuName from "./SidebarMenuName";
import SidebarDetail from "./SidebarDetail";

const ACTION_TYPE = {
  tableType: 1,
  selectCondition: 2,
};
Object.freeze(ACTION_TYPE);

const sidebarRender = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.tableType:
      return {
        ...state,
        dataList: action.dataList,
        loading: action.loading,
      };
    case ACTION_TYPE.selectCondition:
      return {
        ...state,
        illnessName: action.illnessName,
      };
    default:
      return state;
  }
};

const SidebarTemplate = () => {
  const [state, dispatch] = useReducer(
    sidebarRender,
    {
      dataList: [],
      loading: false,
      illnessName: "",
    },
    initData
  );

  async function initData() {
    const response = await fetch("AllillnessData/SetSidebar");
    dispatch({
      type: ACTION_TYPE.tableType,
      dataList: await response.json(),
      loading: true,
    });
  }

  return (
    <div className={styles.containter}>
      <div
        className={styles.sidebar}
        style={{ width: "280px", height: "100%" }}
      >
        <fieldset>
          <legend>질병명</legend>
          <SidebarIllnessName state={state} ACTION_TYPE={ACTION_TYPE} dispatch={dispatch} />
        </fieldset>
        <fieldset>
          <legend>메뉴</legend>
          <SidebarMenuName state={state} />
        </fieldset>
        <fieldset>
          <legend>상세조건</legend>
          <SidebarDetail state={state} />
        </fieldset>
      </div>
    </div>
  );
};

export default SidebarTemplate;
