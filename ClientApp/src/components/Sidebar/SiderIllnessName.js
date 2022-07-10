import React from "react";
import { useState } from "react";
import { useEffect } from "react";



const SiderIllnessName = () => {
  const [state, setState] = useState({
    
  });
  useEffect(() => {
    fetch("AllillnessData/loadChartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data, id) => {
        if (id === 0) {
          const newState = state.concat({ data });
          setState(newState);
        }
        console.log(state);
      });
  });
  return <div></div>;
};

export default SiderIllnessName;
