import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Show from "./components/ShowData";
import Footer from "./components/Footer";
import MapView from "./components/MapView";
import Practice from "./Practice";
import SeoulChart from "./components/SeoulChart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/show" element={<Show />} />
                    <Route path="/mapView" element={<MapView />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/SeoulChart" element={<SeoulChart />} />

                    <Route path="/practice" element={<Practice />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
