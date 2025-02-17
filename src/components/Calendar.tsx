import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowPathIcon
} from '@heroicons/react/20/solid'
import ReservationModal from "./ReservationModal.tsx";
import * as React from "react";

const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Calendar() {
    const [openModal, setOpenModal] = React.useState(false);

    function equalDates(date1: Date, date2: Date) {
        const date1_time_reset = new Date(date1.setHours(0, 0, 0, 0));
        const date2_time_reset = new Date(date2.setHours(0, 0, 0, 0));

        return date1_time_reset.getTime() === date2_time_reset.getTime();
    }

    function equalMonth(date: Date, month: number) {
        return date.getMonth() === month;
    }

    function generateDays(year: number, month: number) {
        const days = [];

        const startDay = new Date(year, month, 1);
        while (startDay.getDay() !== 1) {
            startDay.setDate(startDay.getDate() - 1);
        }

        const totalDays = 6 * 7;
        for (let i = 0; i < totalDays; i++) {
            days.push(new Date(startDay));
            startDay.setDate(startDay.getDate() + 1);
        }

        return days;
    }

    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [today] = React.useState(new Date());

    const [days, setDays] = React.useState(() => generateDays(selectedYear, selectedMonth));

    return (
        <>
            <div className="flex flex-col flex-1 items-center">
                <div className="text-center items-center w-80">
                    <div className="w-full flex text-gray-900">
                        <button
                            type="button"
                            onClick={() => {
                                if (selectedMonth === 0) {
                                    setDays(generateDays(selectedYear - 1, 11));
                                    setSelectedMonth(11);
                                    setSelectedYear(selectedYear - 1);
                                } else {
                                    setSelectedMonth(selectedMonth - 1);
                                    setDays(generateDays(selectedYear, selectedMonth - 1));
                                }
                            }}
                            className="cursor-pointer -m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 mr-auto"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="size-5" aria-hidden="true" />
                        </button>
                        <div className="flex items-center gap-6 text-xl font-semibold ml-auto mr-auto">
                            { months[selectedMonth] + ' ' + selectedYear }
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedMonth(new Date().getMonth());
                                    setSelectedYear(new Date().getFullYear());
                                    setSelectedDate(new Date());
                                    setDays(generateDays(new Date().getFullYear(), new Date().getMonth()));
                                }}
                                className="cursor-pointer">
                                <ArrowPathIcon className="size-5 opacity-40"/>
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (selectedMonth === 11) {
                                    setDays(generateDays(selectedYear + 1, 0));
                                    setSelectedMonth(0);
                                    setSelectedYear(selectedYear + 1);
                                } else {
                                    setSelectedMonth(selectedMonth + 1);
                                    setDays(generateDays(selectedYear, selectedMonth + 1));
                                }
                            }}
                            className="cursor-pointer -m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 ml-auto"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="size-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm ring-1 shadow-sm ring-gray-200">
                        {days.map((day, dayIdx) => (
                            <button
                                key={day.getTime()}
                                type="button"
                                onClick={() => setSelectedDate(day)}
                                className={classNames(
                                    'cursor-pointer',
                                    'py-1.5 hover:bg-gray-100 focus:z-10',
                                    equalMonth(day, selectedMonth) ? 'bg-white' : 'bg-gray-100',
                                    equalDates(day, today) ? 'font-semibold' : '',
                                    equalDates(day, selectedDate) ? 'text-white' : '',
                                    !equalDates(day, selectedDate) && equalMonth(day, selectedMonth) && !equalDates(day, today) ? 'text-gray-900' : '',
                                    !equalDates(day, selectedDate) && !equalMonth(day, selectedMonth) && !equalDates(day, today) ? 'text-gray-400' : '',
                                    equalDates(day, today) && !equalDates(day, selectedDate) ? 'text-blue-600' : '',
                                    dayIdx === 0 ? 'rounded-tl-lg' : '',
                                    dayIdx === 6 ? 'rounded-tr-lg' : '',
                                    dayIdx === days.length - 7 ? 'rounded-bl-lg' : '',
                                    dayIdx === days.length - 1 ? 'rounded-br-lg' : '',
                                )}
                            >
                                <time
                                    dateTime={day.getTime().toString()}
                                    className={classNames(
                                        'cursor-pointer mx-auto flex size-7 items-center justify-center rounded-full',
                                        equalDates(day, today) ? 'bg-blue-200' : '',
                                        equalDates(day, selectedDate) ? 'bg-blue-600' : '',
                                    )}
                                >
                                    {day.getDate()}
                                </time>
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpenModal(true)}
                        className="cursor-pointer mt-8 w-full rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Neue Reservierung
                    </button>
                </div>
            </div>
            <ReservationModal open={openModal} setOpen={setOpenModal}/>
        </>
    )
}