import NavBar from "./components/NavBar.tsx";
import Admin from "./pages/Admin.tsx";
import Reservations from "./pages/Reservations.tsx";
import Stats from "./pages/Stats.tsx";
import Today from "./pages/Today.tsx";
import {HashRouter as Router, Route, Routes, Navigate} from "react-router-dom";

export default function App() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/today" />} />
                        <Route path="/today" element={<Today />} />
                        <Route path="/reservations" element={<Reservations/>} />
                        <Route path="/stats" element={<Stats/>} />
                        <Route path="/admin" element={<Admin/>} />
                    </Routes>
                </Router>
            </div>
        </>
    )
}
