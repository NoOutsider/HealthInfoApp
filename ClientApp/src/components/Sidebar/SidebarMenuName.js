import React from "react";

const SidebarMenuName = ({ state, onSelect }) => {
  const rendering = (dataList) => {
    return (
      <select onClick={onSelect}>
        {dataList.map((data) => {
          if (data.menuName)
            return (
              <option key={data.id} value={data.menuName} name="menuName">
                {data.menuName}
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

export default SidebarMenuName;
