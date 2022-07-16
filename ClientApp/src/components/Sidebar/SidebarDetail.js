import React from "react";

const SidebarDetail = ({ state }) => {
  const rendering = (dataList) => {
    return (
      <div>
        <select>
          {dataList.map((data) => {
            if (data.item)
              return (
                <option key={data.id} name="item">
                  {data.item}
                </option>
              );
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.gender)
              return (
                <option key={data.id} name="gender">
                  {data.gender}
                </option>
              );
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.age)
              return (
                <option key={data.id} name="age">
                  {data.age}
                </option>
              );
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.ioPatient)
              return (
                <option key={data.id} name="ioPatient">
                  {data.ioPatient}
                </option>
              );
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.nursingHome)
              return (
                <option key={data.id} name="nursingHome">
                  {data.nursingHome}
                </option>
              );
          })}
        </select>
        <select>
          {dataList.map((data) => {
            if (data.location)
              return (
                <option key={data.id} name="location">
                  {data.location}
                </option>
              );
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
