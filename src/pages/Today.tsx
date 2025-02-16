import Header from "../components/Header.tsx";
import MainTable from "../components/MainTable.tsx";

export default function Today() {
    return (
        <>
            <Header title={"Heute am " + new Date().toLocaleDateString("de-DE")}/>
            <main className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <MainTable/>
                </div>
            </main>
        </>
    )
}