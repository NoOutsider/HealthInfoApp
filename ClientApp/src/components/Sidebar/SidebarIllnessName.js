import React, { useCallback } from "react";

const SidebarIllnessName = ({ state, ACTION_TYPE, dispatch }) => {
  const rendering = (dataList) => {
    return (
      <select onClick={onSelect}>
        {dataList.map((data) => {
          if (data.illnessName)
            return <option value={data.illnessName}>{data.illnessName}</option>;
        })}
      </select>
    );
  };

  const onSelect = useCallback(
    (e) => {
      dispatch({
        type: ACTION_TYPE.selectCondition,
        illnessName: e.target.value,
      });
      console.log(state);
    },
    [state.illnessName]
  );

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
