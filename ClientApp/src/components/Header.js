import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

function header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </Link>

      <div className="header_centerLocation">
        <Link to="/showData" id="showData">
          <div className="header_option">질병 통계 데이터</div>
        </Link>

        <Link to="/mapView" id="mapView">
          <div className="header_option">병의원 / 약국 찾기</div>
        </Link>

        <Link to="/practice">
           <div className="header_option">데이터 올리기 연습</div>
        </Link>
      </div>

      <div className="header_leftLocation">
        <Link to="/login" id="login">
          <div className="header_option">로그인</div>
        </Link>

        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
    </div>
  );
}

export default header;
