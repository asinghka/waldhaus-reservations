import Header from "../components/Header.tsx";
import ReservationTable from "../components/ReservationTable.tsx";

export default function Today() {
    return (
        <>
            <Header title={"Heute am " + new Date().toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: '2-digit' })}/>
            <main className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <ReservationTable filterDate={new Date()}/>
                </div>
            </main>
        </>
    )
}