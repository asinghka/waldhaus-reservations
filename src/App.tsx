import NavBar from "./components/NavBar.tsx";
import Today from "./pages/Today.tsx";

export default function App() {
    return (
        <>
            <div className="min-h-full">
                <NavBar/>
                <Today/>
            </div>
        </>
    )
}
