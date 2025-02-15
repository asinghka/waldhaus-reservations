import Header from "../components/Header.tsx";
import MainTable from "../components/MainTable.tsx";
import ReservationModal from "../components/ReservationModal.tsx";
import * as React from "react";

export default function Today() {
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <>
            <Header title={"Heute am " + new Date().toLocaleDateString("de-DE")}/>
            <main className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="mt-4 sm:mt-0 sm:ml-auto sm:flex-none">
                            <button
                                type="button"
                                onClick={() => setOpenModal(true)}
                                className="block rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Neue Reservierung
                            </button>
                            <ReservationModal open={openModal} setOpen={setOpenModal}/>
                        </div>
                    </div>
                    <MainTable/>
                </div>
            </main>
        </>
    )
}