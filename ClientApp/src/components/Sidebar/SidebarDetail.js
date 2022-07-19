import React from "react";

const SidebarDetail = ({ state, onSelect }) => {
  const rendering = (dataList) => {
    return (
      <div>
        <select onClick={onSelect} name="item">
          {dataList.map((data) => {
            if (data.item)
              return (
                <option key={data.id} value={data.item}>
                  {data.item}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="gender">
          {dataList.map((data) => {
            if (data.gender)
              return (
                <option key={data.id} value={data.gender}>
                  {data.gender}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="age">
          {dataList.map((data) => {
            if (data.age)
              return (
                <option key={data.id} value={data.age}>
                  {data.age}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="ioPatient">
          {dataList.map((data) => {
            if (data.ioPatient)
              return (
                <option key={data.id} value={data.ioPatient}>
                  {data.ioPatient}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="nursingHome">
          {dataList.map((data) => {
            if (data.nursingHome)
              return (
                <option key={data.id} value={data.nursingHome}>
                  {data.nursingHome}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="location">
          {dataList.map((data) => {
            if (data.location)
              return (
                <option key={data.id} value={data.location}>
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
