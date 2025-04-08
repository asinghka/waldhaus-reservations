import Calendar from "../components/Calendar.tsx";
import {SimpleTable} from "../components/SimpleTable.tsx";
import * as React from "react";
import Header from "../components/Header.tsx";

export default function Reservations() {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
    }

    const handleModalOpen = (open: boolean) => {
        setIsModalOpen(open);
    }

    return (
        <>
            <Header title="Reservierungen im Überblick"/>
            <div className="flex flex-1">
                <div className="flex flex-row flex-1 mx-auto max-w-7xl px-8">
                    <div className="flex h-fit sticky top-10 self-start">
                        <Calendar onDateSelect={handleDateChange} onModalChange={handleModalOpen} />
                    </div>
                    <div className="flex flex-col flex-1 pt-6">
                        <SimpleTable filterDate={selectedDate} modalOpen={isModalOpen} />
                    </div>
                </div>
            </div>
        </>
    );
}