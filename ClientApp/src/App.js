import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import ShowData from "./components/ShowData";
import Footer from "./components/Footer";
import MapView from "./components/MapView"
import HospitalTableData from "./components/HospitalTableData";
import PharmacyTableData from "./components/PharmacyTableData";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showData" element={<ShowData />} />
          <Route path="/mapView" element={<MapView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/HospitalTableData" element={<HospitalTableData />} />
          <Route path="/PharmacyTableData" element={<PharmacyTableData />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
