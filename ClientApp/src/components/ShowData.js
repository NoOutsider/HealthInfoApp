import React from "react";
import "./ShowData.css";
import Sidebar from "./Sidebar";

function ShowData() {
  return (
    <div className="showData">
      <Sidebar width={300} />
      <div className="show-container">
        <img
          className="show-img"
          src="https://forward.nhn.com/2020/seoul/hands-on-labs/toastui.chart-dashboard/_images/step08.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default ShowData;
