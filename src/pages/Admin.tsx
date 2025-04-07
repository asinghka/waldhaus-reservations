import Header from "../components/Header.tsx";
import {AdminTable} from "../components/AdminTable.tsx";

export default function Admin() {
    return (
        <>
            <Header title="Gelöschte Reservierungen"/>
            <main className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <AdminTable />
                </div>
            </main>
        </>
    );
}