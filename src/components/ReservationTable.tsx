import {BookOpenIcon, CheckIcon, PlusCircleIcon, UsersIcon} from "@heroicons/react/16/solid";
import Divider from "./Divider.tsx";
import {useEffect, useState} from "react";
import ReservationModal from "./ReservationModal.tsx";
import {Reservation} from "../types/types";
import {Button} from "@mui/material";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ReservationTable({ filterDate } : { filterDate: Date }) {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [openModal, setOpenModal] = useState(false);

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

    const handleNewReservation = () => {
        setSelectedReservation(null);
        setOpenModal(true);
    }

    const handleEditReservation = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setOpenModal(true);
    }

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
    }, [openModal, filterDate]);

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const intervalId = setInterval(fetchReservations, 60000);
        return () => clearInterval(intervalId);
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

    const isCurrentReservation = (reservation: Reservation) => {
        const reservationDate = new Date(reservation.date);

        const startDate = new Date();
        startDate.setMinutes(startDate.getMinutes() - 15);

        const endDate = new Date();
        endDate.setMinutes(endDate.getMinutes() + 15);

        return reservationDate > startDate && reservationDate < endDate;
    };

    return (
        <>
            {
                reservations.length > 0 ? (
                        <div className="flex mr-auto">
                            <button
                                type="button"
                                onClick={() => handleNewReservation()}
                                className="h-[50px] cursor-pointer mr-auto block rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <div className="flex items-center justify-center">
                                    Neue Reservierung
                                    <PlusCircleIcon className="ml-2 size-6 text-white"/>
                                </div>
                            </button>
                            <div className="ml-auto mt-0 mr-4">
                                <Button
                                    variant="outlined"
                                    sx={{ width: 70, height: 50, borderRadius: '8px', color: 'black', borderColor: 'black' }}
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
                                    sx={{ width: 70, height: 50, borderRadius: '8px', color: 'black', borderColor: 'black' }}
                                >
                                    <div className="flex items-center justify-center">
                                        <UsersIcon className="mr-1 size-7"/>
                                        {dayCount}
                                    </div>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-center justify-center opacity-20 pt-24 pb-20">
                                <h1 className="text-3xl mr-10">Keine Reservierungen vorhanden ...</h1>
                                <img src="./assets/coffee.png" className="size-12 items-center"/>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleNewReservation()}
                                    className="h-[50px] cursor-pointer ml-auto block rounded-md bg-blue-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
                                {
                                    afternoonReservations
                                        .map((reservation) => {
                                                const current = isCurrentReservation(reservation);
                                                return (
                                                    <tr key={reservation.name + reservation.date} className={classNames(current ? "bg-green-200 hover:bg-green-100" : "bg-white hover:bg-gray-50",  "cursor-pointer")} onClick={() => handleEditReservation(reservation)}>
                                                        <td className="py-4 pr-3 pl-4 text-xl text-center font-medium whitespace-nowrap text-gray-900 sm:pl-6 w-3/10">
                                                            {reservation.name}
                                                        </td>
                                                        <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                                        <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                                        <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{reservation.count}</td>
                                                        <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/10">{reservation.notes ? <div className="flex justify-center"><CheckIcon className="size-6"/></div>:''}</td>
                                                    </tr>
                                                )
                                            }
                                        )
                                }
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
                                                Anmerkung
                                            </th>
                                        </tr>
                                        </thead>
                                    }
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {
                                        eveningReservations
                                        .map((reservation) => {
                                            const current = isCurrentReservation(reservation);
                                            return (
                                                <tr key={reservation.name + reservation.date} className={classNames(current ? "bg-green-200 hover:bg-green-100" : "bg-white hover:bg-gray-50",  "cursor-pointer")} onClick={() => handleEditReservation(reservation)}>
                                                    <td className="py-4 pr-3 pl-4 text-xl text-center font-medium whitespace-nowrap text-gray-900 sm:pl-6 w-3/10">
                                                        {reservation.name}
                                                    </td>
                                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{new Date(reservation.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-2/10">{reservation.count}</td>
                                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900 w-1/10">{reservation.notes ? <div className="flex justify-center"><CheckIcon className="size-6"/></div>:''}</td>
                                                </tr>
                                                )
                                            }
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <ReservationModal open={openModal} setOpen={setOpenModal} reservation={selectedReservation} inputDate={null} />
        </>
    )
}