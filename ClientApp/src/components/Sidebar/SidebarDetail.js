import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

const SidebarDetail = ({ state, onSelect }) => {
  const rendering = (dataList) => {
    return (
      <div>
        <select onClick={onSelect} name="item" id="item">
          {dataList.map((data) => {
            if (data.item)
              return (
                <option key={data.id} value={data.item}>
                  {data.item}
                </option>
              );
          })}
        </select>
        <div>
          {dataList.map((data) => {
            if (data.gender)
              return (
                <div>
                  <input
                    onClick={onSelect}
                    name="gender"
                    id="gender"
                    type="radio"
                    key={data.id}
                    value={data.gender}
                  />
                  {data.gender}
                </div>
              );
            else if (data.gender)
              return (
                <div>
                  <input
                    onClick={onSelect}
                    name="gender"
                    id="gender"
                    type="radio"
                    key={data.id}
                    value={data.gender}
                  />
                  {data.gender}
                </div>
              );
          })}
        </div>
        <select onClick={onSelect} name="age_5" id="age_5">
          {dataList.map((data) => {
            if (data.age_5)
              return (
                <option key={data.id} value={data.age_5}>
                  {data.age_5}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="age_10" id="age_10">
          {dataList.map((data) => {
            if (data.age_10)
              return (
                <option key={data.id} value={data.age_10}>
                  {data.age_10}
                </option>
              );
          })}
        </select>
        <div>
          {dataList.map((data) => {
            if (data.ioPatient)
              return (
                <div>
                  <input
                    id="ioPatient"
                    type="radio"
                    onClick={onSelect}
                    key={data.id}
                    name="ioPatient"
                    value={data.ioPatient}
                  />
                  {data.ioPatient}
                </div>
              );
          })}
        </div>
        <select onClick={onSelect} name="nursingHome" id="nursingHome">
          {dataList.map((data) => {
            if (data.nursingHome)
              return (
                <option key={data.id} value={data.nursingHome}>
                  {data.nursingHome}
                </option>
              );
          })}
        </select>
        <select onClick={onSelect} name="location" id="location">
          {dataList.map((data) => {
            if (data.location)
              return (
                <option key={data.id} value={data.location}>
                  {data.location}
                </option>
              );
          })}
        </select>
        <DatePicker />
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
