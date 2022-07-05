import React, { useState, useRef, useCallback } from "react";
import styles from "./Sidebar.module.css";
import SidebarDetailCondition from "./SidebarDetailCondition";

// function todoReducer(state, action) {
//   switch (action.type) {
//       case ACTION_TYPE.INSERT:
//           return { ...state, todos: state.todos.concat(action.todo) };
//       case ACTION_TYPE.REMOVE:
//           return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
//       case ACTION_TYPE.TOGGLE:
//           return {
//               ...state, todos: state.todos.map((todo) =>
//                   todo.id === action.id ? { ...todo, completed: action.completed } : todo
//               )
//           };
//       case ACTION_TYPE.ALL_TODO_LIST:
//           return { todos: action.todos, loading: action.loading };
//       default:
//           return state;
//   }
// }

// const ACTION_TYPE = {
//   INSERT: 1,
//   REMOVE: 2,
//   TOGGLE: 3,
//   ALL_TODO_LIST: 4
// };

const SidebarIllness = ({ width = 280 }) => {
  const [illnessName, setIllnessName] = useState("");
  const [visible, setVisible] = useState("");
  const handleMenuSelect = useCallback(
    (e) => {
      setVisible(e.target.value);
      console.log(visible);
    },
    [visible]
  );
  const inputEl = useRef(null);

  // const onSearch = useCallback((state) => {
  //   //서버에 등록 후 성공이면 객체를 얻어 reducer 함수를 통해 추가한다
  //   fetch("SearchData/AllList6", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       // ID: ID,
  //       // illnessName: illnessName,
  //       // menu: menu,
  //       // item: item,
  //       // gender: gender,
  //       // decade: decade,
  //       // ioPatient: ioPatient,
  //       // nursingHome: nursingHome,
  //       // location: location,
  //       // date: date,
  //       // halfDecade: halfDecade,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((todo) => {
  //       if (todo != null && todo.id != 0) {
  //         dispatch({ type: ACTION_TYPE.INSERT, todo: todo });
  //       } else {
  //         alert("네트웍 문제로 인하여 처리할 수 없습니다");
  //       }
  //     })
  //     .catch((ex) => {
  //       alert("네트웍 문제로 인하여 처리할 수 없습니다");
  //     });
  // });

  // const onSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault();

  //     if (value === "") return;
  //     //App에 todo 항목을 추가함
  //     onInsert(value);

  //     setValue("");
  //   },
  //   [onInsert, value]
  // );

  const inputIllnessName = (e) => {
    setIllnessName(e.target.value);
    console.log(illnessName);
  };
  const searchIllnessName = () => {
    alert(illnessName);
    setIllnessName("");
    inputEl.current.focus();
  };
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      searchIllnessName();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%" }}
      >
        <form>
          <input
            className={styles.inputIllnessName}
            ref={inputEl}
            value={illnessName}
            name="illnessName"
            placeholder="질병명을 입력하세요"
            onChange={inputIllnessName}
            onKeyPress={pressEnter}
            style={{ height: "30px" }}
          />
          <button onClick={searchIllnessName}>확인</button>
          <p>흡연(니코틴 중독)</p>
          <p>거북목</p>
          <p>관절염</p>
          <p>오십견</p>
          <p>당뇨</p>
          <div className="illnessPageHeader">
            <div className="searchConditionHeader">
              <fieldset>
                <legend>메뉴</legend>
                <input
                  type={"radio"}
                  name="menu"
                  value="nursingHomeLocation"
                  onClick={handleMenuSelect}
                />
                요양기관소재지별
                <input
                  type={"radio"}
                  name="menu"
                  value="nursingHomeGroup"
                  onClick={handleMenuSelect}
                />
                요양기관그룹별
                <br />
                <input
                  type={"radio"}
                  name="menu"
                  value="genderOutPatient"
                  onClick={handleMenuSelect}
                />
                성별입원외래별
                <input
                  type={"radio"}
                  name="menu"
                  value="genderTenAge"
                  onClick={handleMenuSelect}
                />
                성별연령10세구간 combobox..
                <br />
                <input
                  type={"radio"}
                  name="menu"
                  value="genderFiveAge"
                  onClick={handleMenuSelect}
                />
                성별연령5세구
              </fieldset>
            </div>
            {visible && <SidebarDetailCondition visible={visible} />}
            {/* <button onClick={onSubmit} /> */}
            검색
          </div>
        </form>
      </div>
    </div>
  );
};

export default SidebarIllness;
