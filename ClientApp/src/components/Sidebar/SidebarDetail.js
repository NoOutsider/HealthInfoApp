import React from "react";

const SidebarDetail = ({ state, onSelect }) => {
    const rendering = (dataList) => {
        return (
            <div>
                <fieldset>
                    <legend>공통항목</legend>
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
                </fieldset>
                <fieldset>
                    <legend>성별</legend>
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
                    })}
                </fieldset>
                <fieldset>
                    <legend>나이</legend>
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
                </fieldset>
                <fieldset>
                    <legend>입원/외래</legend>
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
                </fieldset>
                <fieldset>
                    <legend>요양기관</legend>
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
                </fieldset>
                <fieldset>
                    <legend>지역</legend>
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
                </fieldset>
            </div>
        );
    };

    let contents = !state.sidebarRenderingLoading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : (
        rendering(state.dataList)
    );

    return <div>{contents}</div>;
};

export default SidebarDetail;