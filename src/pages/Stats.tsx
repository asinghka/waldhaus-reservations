import BarChart from "../components/BarChart.tsx";
import Header from "../components/Header.tsx";
import {BookOpenIcon, UsersIcon} from "@heroicons/react/16/solid";
import {useEffect, useState} from "react";
import {Reservation} from "../types/types";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";

export default function Stats() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filterDate, setFilterDate] = useState<Dayjs>(dayjs());

    const [monthCount, setMonthCount] = useState<number>(0);
    const [monthReservation, setMonthReservation] = useState<number>(0);

    const [countView, setCountView] = useState<boolean>(false);
    const [yearView, setYearView] = useState<boolean>(false);

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
                    <div className="mt-0 mr-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker
                                label="Monat"
                                views={['month']}
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
                    <div className="mt-0">
                        <Button
                            variant="contained"
                            onClick={() => setYearView(!yearView)}
                            sx={{ width: 150, height: 50, borderRadius: '8px', backgroundColor: yearView ? 'rgb(21, 93, 252)' : 'rgb(51,118,253)' }}
                        >
                            {yearView ? "Monatsansicht" : "Jahresansicht"}
                        </Button>
                    </div>
                    <div className="ml-auto mt-0 mr-4">
                        <Button
                            variant={!countView ? "contained" : "outlined"}
                            onClick={() => setCountView(false)}
                            sx={{
                                width: 70,
                                height: 50,
                                borderRadius: '8px',
                                backgroundColor: !countView ? 'rgb(21, 93, 252)' : 'transparent',
                                color: !countView ? 'white' : 'black',
                                border: !countView ? 'none' : '1px solid black',
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <BookOpenIcon className="mr-1 size-7"/>
                                {monthReservation}
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant={countView ? "contained" : "outlined"}
                            onClick={() => setCountView(true)}
                            sx={{
                                width: 70,
                                height: 50,
                                borderRadius: '8px',
                                color: countView ? 'white' : 'black',
                                backgroundColor: countView ? 'secondary.main' : 'transparent',
                                borderColor: countView ? 'secondary.main' : 'black',
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <UsersIcon className="mr-1 size-7"/>
                                {monthCount}
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="pt-12 px-4 mx-auto max-w-7xl">
                    <BarChart reservations={reservations} countView={countView} yearView={yearView} filterDate={filterDate.toDate()} />
                </div>
            </main>
        </>
    );
}