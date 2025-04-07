import BarChart from "../components/BarChart.tsx";
import Header from "../components/Header.tsx";

export default function Stats() {
    return (
        <>
            <Header title="Statistik zu Reservierungen"/>
            <main className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BarChart />
                </div>
            </main>
        </>
    );
}