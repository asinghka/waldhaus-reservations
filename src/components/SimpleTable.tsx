import {BookOpenIcon, CheckIcon, UsersIcon} from "@heroicons/react/16/solid";
import * as React from "react";
import ReservationModal from "./ReservationModal.tsx";
import {useEffect, useState} from "react";
import {Reservation} from "../types/types";
import {Button} from "@mui/material";

export function SimpleTable({ filterDate, modalOpen } : { filterDate: Date, modalOpen: boolean }) {
    const [reservations, setReservations] = useState<Reservation[]>([]);

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
            }).sort((a, b) => {
                const timeA = new Date(a.date).getTime();
                const timeB = new Date(b.date).getTime();
                return timeA - timeB;
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
        setSelectedReservation(reservation);
        setOpenModal(true);
    }

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
    }, [openModal, modalOpen, filterDate]);

    return (
        <>
            <div className="flex flow-row pb-6 ml-auto">
                <div className="ml-auto mt-0 mr-4">
                    <Button
                        variant="outlined"
                        color=""
                        sx={{ width: 70, height: 50, borderRadius: '8px' }}
                    >
                        <div className="flex items-center justify-center">
                            <BookOpenIcon className="mr-1 size-7"/>
                            {dayReservation}
                        </div>
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color=""
                        sx={{ width: 70, height: 50, borderRadius: '8px' }}
                    >
                        <div className="flex items-center justify-center">
                            <UsersIcon className="mr-1 size-7"/>
                            {dayCount}
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col pl-6">
                <div className="auto">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 rounded-lg">
                            <table className="w-full divide-y divide-gray-300">
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
                                {reservations
                                    .map((reservation) => (
                                        <tr key={reservation.name + reservation.date} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleEditReservation(reservation)}>
                                            <td className="text-xl text-center font-medium whitespace-nowrap text-gray-900 w-3/10">
                                                {reservation.name}
                                            </td>
                                            <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit' })}</td>
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
            </div>
            <ReservationModal open={openModal} setOpen={setOpenModal} reservation={selectedReservation} inputDate={null} />
        </>
    )
}