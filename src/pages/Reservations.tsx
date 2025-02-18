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
            <div className="flex flex-row flex-1 items-center">
                <Calendar onDateSelect={handleDateChange}/>
                <SimpleTable filterDate={selectedDate}/>
            </div>
        </>
    );
}