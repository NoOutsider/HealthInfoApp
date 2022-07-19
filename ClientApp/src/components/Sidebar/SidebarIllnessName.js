import React from "react";

const SidebarIllnessName = ({ state, onSelect }) => {
  const rendering = (dataList) => {
    return (
      <select name="illnessName" onClick={onSelect}>
        {dataList.map((data) => {
          if (data.illnessName)
            return (
              <option key={data.id} value={data.illnessName}>
                {data.illnessName}
              </option>
            );
        })}
      </select>
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

export default SidebarIllnessName;
