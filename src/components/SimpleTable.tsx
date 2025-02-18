import {CheckIcon} from "@heroicons/react/16/solid";
import * as React from "react";
import ReservationModal from "./ReservationModal.tsx";
import {useEffect, useState} from "react";

declare global {
    interface Window {
        electron: {
            getReservations: () => Promise<{ id: number; name: string; date: string; count: number; contact: string; notes: string; deleted: boolean }[]>;
        };
    }
}

export function SimpleTable({ filterDate } : { filterDate: Date }) {
    const [openModal, setOpenModal] = React.useState(false);

    const [reservations, setReservations] = useState<{ id: number; name: string; date: string; count: number; contact: string; notes: string; deleted: boolean }[]>([]);

    const fetchReservations = async () => {
        try {
            const data = await window.electron.getReservations();
            const filteredReservations = data.filter((reservation) => {
                const reservationDate = new Date(reservation.date);
                return reservationDate.getFullYear() === filterDate.getFullYear()
                    && reservationDate.getMonth() === filterDate.getMonth()
                    && reservationDate.getDate() === filterDate.getDate()
                    && !reservation.deleted;
            });

            setReservations(filteredReservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
    }, [filterDate]);

    return (
        <>
            <div className="flex flex-col flex-1 items-center">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-xl font-semibold text-gray-900 sm:pl-6 w-1/5">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-1/5">
                                        Datum
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-1/5">
                                        Uhrzeit
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-1/5">
                                        Anzahl
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-lg font-semibold text-gray-900">
                                        Anmerkung
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {reservations
                                    .map((reservation) => (
                                        <tr key={reservation.name + reservation.date} className="hover:bg-gray-50 cursor-pointer" onClick={() => setOpenModal(true)}>
                                            <td className="py-4 pr-3 pl-4 text-xl text-center font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                {reservation.name}
                                            </td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/5">{new Date(reservation.date).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/5">{new Date(reservation.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/5">{reservation.count}</td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/5">{reservation.notes ? <div className="flex justify-center"><CheckIcon className="size-6"/></div>:''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ReservationModal open={openModal} setOpen={setOpenModal}/>
        </>
    )
}