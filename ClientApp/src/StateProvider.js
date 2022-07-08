import React, { createContext, useContext, useReducer } from "react"

export const StateContext = createContext();

// 데이터 레이어 제공
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);


//데이터레이어에서 각 컴포넌트에 전달해주는 메소드

export const useStateValue = () => useContext(StateContext);