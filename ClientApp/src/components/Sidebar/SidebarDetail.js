import React from "react";

const SidebarDetail = ({ state, onSelect }) => {
  const rendering = (dataList) => {
    return (
      <div>
        <select onClick={onSelect}>
          {dataList.map((data) => {
            if (data.item)
              return (
                <option key={data.id} value={data.item} name="item">
                  {data.item}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect}>
          {dataList.map((data) => {
            if (data.gender)
              return (
                <option key={data.id} value={data.gender} name="gender">
                  {data.gender}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect}>
          {dataList.map((data) => {
            if (data.age)
              return (
                <option key={data.id} value={data.age} name="age">
                  {data.age}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect}>
          {dataList.map((data) => {
            if (data.ioPatient)
              return (
                <option key={data.id} value={data.ioPatient} name="ioPatient">
                  {data.ioPatient}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect}>
          {dataList.map((data) => {
            if (data.nursingHome)
              return (
                <option
                  key={data.id}
                  value={data.nursingHome}
                  name="nursingHome"
                >
                  {data.nursingHome}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect}>
          {dataList.map((data) => {
            if (data.location)
              return (
                <option key={data.id} value={data.location} name="location">
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
