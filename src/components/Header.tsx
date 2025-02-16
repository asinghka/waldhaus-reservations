import {PlusCircleIcon} from "@heroicons/react/16/solid";
import ReservationModal from "./ReservationModal.tsx";
import * as React from "react";

export default function Header({ title }: {title: string}) {
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <header className="shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold tracking-wide text-gray-900">{title}</h1>
                    <button
                        type="button"
                        onClick={() => setOpenModal(true)}
                        className="cursor-pointer block rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <div className="flex items-center justify-center">
                            Neue Reservierung
                            <PlusCircleIcon className="ml-2 size-6 text-white"/>
                        </div>
                    </button>
                    <ReservationModal open={openModal} setOpen={setOpenModal}/>
                </div>
            </div>
        </header>
    )
}