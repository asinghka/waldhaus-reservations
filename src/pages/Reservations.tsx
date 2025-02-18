import Calendar from "../components/Calendar.tsx";
import {SimpleTable} from "../components/SimpleTable.tsx";
import * as React from "react";
import Header from "../components/Header.tsx";

export default function Reservations() {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
    }

    return (
        <>
            <Header title="Reservierungen im Überblick"/>
            <div className="flex flex-1">
                <div className="flex flex-row flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex pt-24 h-fit sticky top-10 self-start">
                        <Calendar onDateSelect={handleDateChange}/>
                    </div>
                    <div className="flex flex-col flex-1 pt-6 px-10">
                        <SimpleTable filterDate={selectedDate}/>
                    </div>
                </div>
            </div>
        </>
    );
}