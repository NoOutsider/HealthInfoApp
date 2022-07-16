import React from "react";

const SidebarMenuName = ({ state }) => {
  const rendering = (dataList) => {
    return (
      <select>
        {dataList.map((data) => {
          if (data.menuName)
            return (
              <option key={data.id} name="menuName">
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
