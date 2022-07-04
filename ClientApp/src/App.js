import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import ShowData from "./components/ShowData";
import Footer from "./components/Footer";
import MapView from "./components/MapView";
import SeoulChart from "./components/SeoulChart";
import NursingHomeLocationDataTable from "./components/NursingHomeLocationDataTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NursingHomeGroupDataTable from "./components/NursingHomeGroupDataTable";
import MaleOutPatientDataTable from "./components/MaleOutPatientDataTable";
import FemaleOutPatientDataTable from "./components/FemaleOutPatientDataTable";
import FemaleTenAgeDataTable from "./components/FemaleTenAgeDataTable";
import FemaleFiveAgeDataTable from "./components/FemaleFiveAgeDataTable";

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
          <Route path="/SeoulChart" element={<SeoulChart />} />
          <Route
            path="/NursingHomeLocationDataTable"
            element={<NursingHomeLocationDataTable />}
          />
          <Route
            path="/NursingHomeGroupDataTable"
            element={<NursingHomeGroupDataTable />}
          />
          <Route
            path="/MaleOutPatientDataTable"
            element={<MaleOutPatientDataTable />}
          />
          <Route
            path="/FemaleOutPatientDataTable"
            element={<FemaleOutPatientDataTable />}
          />
          <Route
            path="/FemaleTenAgeDataTable"
            element={<FemaleTenAgeDataTable />}
          />
          <Route
            path="/FemaleFiveAgeDataTable"
            element={<FemaleFiveAgeDataTable />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
