import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import ShowData from "./components/ShowData";
import Footer from "./components/Footer";
import MapView from "./components/MapView"
import SeoulChart from "./components/SeoulChart"
import NursingHomeLocationDataTable from "./components/NursingHomeLocationDataTable"
import NursingHomeGroupDataTable from "./components/NursingHomeGroupDataTable"
import MaleOutPatientDataTable from "./components/MaleOutPatientDataTable"
import FemaleOutPatientDataTable from "./components/FemaleOutPatientDataTable"
import FemaleTenAgeDataTable from "./components/FemaleTenAgeDataTable"
import FemaleFiveAgeDataTable from "./components/FemaleFiveAgeDataTable"
import HospitalTableData from "./components/HospitalTableData";
import PharmacyTableData from "./components/PharmacyTableData";
import ShowMoon from "./components/ShowMoon";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/ShowMoon" element={<ShowMoon />} />
          <Route path="/" element={<Home />} />
          <Route path="/showData" element={<ShowData />} />
          <Route path="/mapView" element={<MapView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SeoulChart" element={<SeoulChart />} />
          <Route path="/HospitalTableData" element={<HospitalTableData />} />
          <Route path="/PharmacyTableData" element={<PharmacyTableData />} />
          <Route path="/NursingHomeLocationDataTable" element={<NursingHomeLocationDataTable />} />
          <Route path="/NursingHomeGroupDataTable" element={<NursingHomeGroupDataTable />} />
          <Route path="/MaleOutPatientDataTable" element={<MaleOutPatientDataTable />} />
          <Route path="/FemaleOutPatientDataTable" element={<FemaleOutPatientDataTable />} />
          <Route path="/FemaleTenAgeDataTable" element={<FemaleTenAgeDataTable />} />
          <Route path="/FemaleFiveAgeDataTable" element={<FemaleFiveAgeDataTable />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
