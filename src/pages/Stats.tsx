import BarChart from "../components/BarChart.tsx";
import Header from "../components/Header.tsx";
import {BookOpenIcon, UsersIcon} from "@heroicons/react/16/solid";
import {useEffect, useState} from "react";
import {Reservation} from "../types/types";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";

export default function Stats() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

    const [monthCount, setMonthCount] = useState<number>(0);
    const [monthReservation, setMonthReservation] = useState<number>(0);

    const fetchReservations = async () => {
        try {
            const data = await window.electron.getReservations();

            const filteredReservations = data.filter((reservation) => {
                const reservationDate = new Date(reservation.date);
                return reservationDate.getFullYear() === filterDate.toDate().getFullYear()
                    && reservationDate.getMonth() === filterDate.toDate().getMonth()
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

            setMonthCount(people);
            setMonthReservation(tables);

        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    useEffect(() => {
        fetchReservations().catch(error => console.error('Error fetching reservations:', error));
    }, [filterDate]);

    return (
        <>
            <Header title="Statistik zu Reservierungen"/>
            <main className="py-6">
                <div className="flex px-8 mx-auto max-w-7xl">
                    <div className="mt-0">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker
                                label="Monat"
                                views={['year', 'month']}
                                value={filterDate}
                                onChange={(selectedDate) => setFilterDate(selectedDate ? selectedDate : dayjs())}
                                slotProps={{
                                    textField: {
                                        sx: {
                                            "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "black",
                                            },
                                        },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="ml-auto mt-0 mr-4">
                        <button
                            type="button"
                            disabled={true}
                            className="block rounded-md bg-gray-50 px-3 py-2 text-center text-lg font-regular shadow-xs outline-1 outline-gray-900"
                        >
                            <div className="flex items-center justify-center">
                                <BookOpenIcon className="mr-2 size-6"/>
                                {monthReservation}
                            </div>
                        </button>
                    </div>
                    <div className="mt-0">
                        <button
                            type="button"
                            disabled={true}
                            className="block rounded-md bg-gray-50 px-3 py-2 text-center text-lg font-regular shadow-xs outline-1 outline-gray-900"
                        >
                            <div className="flex items-center justify-center">
                                <UsersIcon className="mr-2 size-6"/>
                                {monthCount}
                            </div>
                        </button>
                    </div>
                </div>
                <div className="px-4 mx-auto max-w-7xl">
                    <BarChart reservations={reservations} />
                </div>
            </main>
        </>
    );
}