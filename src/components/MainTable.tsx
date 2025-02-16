import {BookOpenIcon, CheckIcon, UsersIcon} from "@heroicons/react/16/solid";
import Divider from "./Divider.tsx";
import {useEffect, useState} from "react";
import ReservationModal from "./ReservationModal.tsx";
import * as React from "react";

declare global {
    interface Window {
        electron: {
            getReservations: () => Promise<{ id: number; name: string; date: string; count: number; contact: string; notes: string; deleted: boolean }[]>;
        };
    }
}

export default function MainTable( { filterDate } : { filterDate: Date }) {
    const [reservations, setReservations] = useState<{ id: number; name: string; date: string; count: number; contact: string; notes: string; deleted: boolean }[]>([]);
    const [openModal, setOpenModal] = React.useState(false);

    const [dayCount, setDayCount] = useState<number>(0);
    const [dayReservation, setDayReservation] = useState<number>(0);

    const fetchReservations = async () => {
        try {
            const data = await window.electron.getReservations();

            const filteredReservations = data.filter((reservation) => {
                const reservationDate = new Date(reservation.date)
                return reservationDate === filterDate;
            });

            setReservations(filteredReservations);

            let people = 0;
            let tables = 0;
            for (const reservation of data) {
                people += reservation.count;
                tables += 1;
            }

            setDayCount(people);
            setDayReservation(tables);

        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
    }, []);

    const afternoonReservations = reservations.filter(
        (reservation) => {
            const time = new Date(reservation.date).getHours()
            return time < 17
        }
    )

    const eveningReservations = reservations.filter(
        (reservation) => {
            const time = new Date(reservation.date).getHours()
            return time >= 17
        }
    )

    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="mt-4 sm:mt-0 ml-auto mr-4">
                    <button
                        type="button"
                        disabled={true}
                        className="block rounded-md bg-gray-50 px-3 py-2 text-center text-lg font-regular shadow-xs outline-1 outline-gray-900"
                    >
                        <div className="flex items-center justify-center">
                            <BookOpenIcon className="mr-2 size-6"/>
                            {dayReservation}
                        </div>
                    </button>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        disabled={true}
                        className="block rounded-md bg-gray-50 px-3 py-2 text-center text-lg font-regular shadow-xs outline-1 outline-gray-900"
                    >
                        <div className="flex items-center justify-center">
                            <UsersIcon className="mr-2 size-6"/>
                            {dayCount}
                        </div>
                    </button>
                </div>
            </div>
            {
                afternoonReservations.length > 0 &&
                <div className="mt-8 flow-root">
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
                                    {afternoonReservations
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
            }
            {
                afternoonReservations.length > 0 && eveningReservations.length > 0 && <Divider />
            }
            {
                eveningReservations.length > 0 &&
                <div className={afternoonReservations.length === 0 ? 'mt-8 flow-root' : 'flow-root'}>
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    {
                                        afternoonReservations.length === 0 &&
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
                                            <th scope="col" className="px-3 py-3.5 text-lg font-semibold text-gray-900 w-1/5">
                                                Anmerkung
                                            </th>
                                        </tr>
                                        </thead>
                                    }
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {eveningReservations
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
            }
            <ReservationModal open={openModal} setOpen={setOpenModal}/>
        </>
    )
}