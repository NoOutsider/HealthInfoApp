import React from "react";

const SidebarDetail = ({ state }) => {
  const rendering = (dataList) => {
    return (
      <div>
        <select>
          {dataList.map((data) => {
            if (data.item) return <option>{data.item}</option>;
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.gender) return <option>{data.gender}</option>;
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.age) return <option>{data.age}</option>;
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.ioPatient) return <option>{data.ioPatient}</option>;
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.nursingHome) return <option>{data.nursingHome}</option>;
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.location) return <option>{data.location}</option>;
          })}
        </select>
      </div>
    );
  };
  let contents = !state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    rendering(state.dataList)
  );

  return <div>{contents}</div>;
};

export default SidebarDetail;
