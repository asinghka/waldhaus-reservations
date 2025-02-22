'use client'

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {XMarkIcon} from "@heroicons/react/16/solid";
import {Reservation} from "../types/types";
import {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider, TimePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de';
import {TextField} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ReservationModal( { open, setOpen, reservation, inputDate }: { open: boolean, setOpen: (open: boolean) => void, reservation: Reservation | null, inputDate: Date | null } ) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [time, setTime] = useState<Dayjs | null>(dayjs().hour(18).minute(0).second(0));
    const [count, setCount] = useState<string>('2');
    const [contact, setContact] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        if (reservation) {
            setEditMode(true);
            setReadOnly(true);

            setName(reservation.name);
            setDate(dayjs(reservation.date));
            setTime(dayjs(reservation.date))
            setCount(reservation.count.toString());
            setContact(reservation.contact);
            setNotes(reservation.notes);

        } else if (inputDate) {
            setName('');
            setDate(dayjs(inputDate));
            setTime(dayjs(inputDate).hour(18).minute(0).second(0));
            setCount('2');
            setContact('');
            setNotes('');

        } else {
            setName('');
            setDate(dayjs());
            setTime(dayjs().hour(18).minute(0).second(0));
            setCount('2');
            setContact('');
            setNotes('');
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-gray-800 px-4 py-3 sm:flex sm:px-6 pt-6 pb-6">
                            <DialogTitle as="h3" className="ml-4 text-2xl font-semibold text-white ">
                                {editMode ? "Reservierung bearbeiten" : "Neue Reservierung"}
                            </DialogTitle>
                            <XMarkIcon className="size-8 text-white ml-auto cursor-pointer" onClick={() => setOpen(false)}/>
                        </div>
                        <div className={classNames(
                            readOnly ? "bg-gray-100" : "bg-white",
                            "px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                        )}>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 mb-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left w-full ">
                                    <div className="grid gap-x-6 gap-y-8 grid-cols-12 w-full">
                                        <div className="col-span-4">
                                            <TextField
                                                label="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={readOnly}
                                                inputProps={{ style: { WebkitTextFillColor: "black" } }}
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                <DatePicker
                                                    label="Datum"
                                                    value={date}
                                                    onChange={(selectedDate) => setDate(selectedDate)}
                                                    disabled={readOnly}
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
                                        <div className="col-span-4">
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                <TimePicker
                                                    label="Uhrzeit"
                                                    value={time}
                                                    onChange={(selectedTime) => setTime(selectedTime)}
                                                    disabled={readOnly}
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
                                    </div>
                                    <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-12">
                                        <div className="col-span-4">
                                            <TextField
                                                label="Anzahl"
                                                value={count}
                                                onChange={(e) => {
                                                    const value = e.target.value;

                                                    // Allow only numbers (optional: allow empty string)
                                                    if (/^\d*$/.test(value)) {
                                                        setCount(value);
                                                    }
                                                }}
                                                disabled={readOnly}
                                                inputProps={{ style: { WebkitTextFillColor: "black" } }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-12">
                                        <div className="col-span-full">
                                            <TextField
                                                label="Kontakt"
                                                fullWidth
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                disabled={readOnly}
                                                inputProps={{ style: { WebkitTextFillColor: "black" } }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                        <div className="col-span-full">
                                            <TextField
                                                label="Anmerkungen"
                                                fullWidth
                                                multiline
                                                rows={3}
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                disabled={readOnly}
                                                inputProps={{ style: { WebkitTextFillColor: "black" } }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row sm:px-6 pt-6 pb-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="cursor-pointer inline-flex w-36 justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-100 ml-6 mr-4"
                            >
                                Abbrechen
                            </button>

                            {
                                readOnly ? (
                                    <button
                                        type="button"
                                        onClick={() => setReadOnly(false)}
                                        className="cursor-pointer ml-auto mr-4 inline-flex w-36 justify-center rounded-md bg-yellow-400 px-3 py-2 text-lg font-semibold text-gray-900 shadow-xs hover:bg-yellow-300"
                                    >
                                        Bearbeiten
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="cursor-pointer ml-auto mr-4 inline-flex w-36 justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-xs hover:bg-blue-500"
                                    >
                                        Speichern
                                    </button>
                                )
                            }
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
