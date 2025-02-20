import {BookOpenIcon, CheckIcon, PlusCircleIcon, UsersIcon} from "@heroicons/react/16/solid";
import Divider from "./Divider.tsx";
import {useEffect, useState} from "react";
import ReservationModal from "./ReservationModal.tsx";
import * as React from "react";
import {Reservation} from "../types/types";

declare global {
    interface Window {
        electron: {
            getReservations: () => Promise<{ id: number; name: string; date: string; count: number; contact: string; notes: string; deleted: boolean }[]>;
        };
    }
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ReservationTable({ filterDate } : { filterDate: Date }) {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [openModal, setOpenModal] = React.useState(false);

    const [dayCount, setDayCount] = useState<number>(0);
    const [dayReservation, setDayReservation] = useState<number>(0);

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

            let people = 0;
            let tables = 0;
            for (const reservation of filteredReservations) {
                people += reservation.count;
                tables += 1;
            }

            setDayCount(people);
            setDayReservation(tables);

        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    const handleEditReservation = (reservation: Reservation) => {
        setReadOnly(true);
        setSelectedReservation(reservation);
        setOpenModal(true);
    }

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
    }, [filterDate]);

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
            {
                reservations.length > 0 ? (
                        <div className="sm:flex sm:items-center mr-auto">
                            <button
                                type="button"
                                onClick={() => setOpenModal(true)}
                                className="cursor-pointer mr-auto block rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <div className="flex items-center justify-center">
                                    Neue Reservierung
                                    <PlusCircleIcon className="ml-2 size-6 text-white"/>
                                </div>
                            </button>
                            <div className="mt-4 sm:mt-0 mr-4">
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
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-center justify-center opacity-20 pt-24 pb-20">
                                <h1 className="text-3xl mr-10">Keine Reservierungen vorhanden ...</h1>
                                <img src="/assets/coffee.png" className="size-12 items-center"/>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(true)}
                                    className="cursor-pointer ml-auto block rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    <div className="flex items-center justify-center">
                                        Neue Reservierung
                                        <PlusCircleIcon className="ml-2 size-6 text-white"/>
                                    </div>
                                </button>
                            </div>
                        </div>
                )
            }
            {
                afternoonReservations.length > 0 &&
                <div className="mt-8 flow-root">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-xl font-semibold text-gray-900 sm:pl-6 w-3/10">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-2/10">
                                        Datum
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-2/10">
                                        Uhrzeit
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-2/10">
                                        Anzahl
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-1/10">
                                        Anm.
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {afternoonReservations
                                    .map((reservation) => (
                                        <tr key={reservation.name + reservation.date} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleEditReservation(reservation)}>
                                            <td className="py-4 pr-3 pl-4 text-xl text-center font-medium whitespace-nowrap text-gray-900 sm:pl-6 w-3/10">
                                                {reservation.name}
                                            </td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{reservation.count}</td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/10">{reservation.notes ? <div className="flex justify-center"><CheckIcon className="size-6"/></div>:''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {
                afternoonReservations.length > 0 && eveningReservations.length > 0 && <Divider />
            }
            {
                eveningReservations.length > 0 &&
                <div className={classNames(
                    afternoonReservations.length === 0 ? 'mt-8' : '',
                    'flow-root'
                )}>
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
                                            <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900 w-1/5">
                                                Anmerkung
                                            </th>
                                        </tr>
                                        </thead>
                                    }
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {eveningReservations
                                        .map((reservation) => (
                                            <tr key={reservation.name + reservation.date} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleEditReservation(reservation)}>
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
            <ReservationModal open={openModal} setOpen={setOpenModal} reservation={selectedReservation} readOnly={readOnly}/>
        </>
    )
}