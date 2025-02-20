'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {XMarkIcon} from "@heroicons/react/16/solid";
import {Reservation} from "../types/types";
import {useEffect, useState} from "react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ReservationModal( { open, setOpen, reservation }: { open: boolean, setOpen: (open: boolean) => void, reservation: Reservation | null } ) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [count, setCount] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        if (reservation) {
            setEditMode(true);
            setReadOnly(true);

            setName(reservation.name);
            setDate(new Date(reservation.date).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: '2-digit' }));
            setTime(new Date(reservation.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }))
            setCount(reservation.count.toString());
            setContact(reservation.contact);
            setNotes(reservation.notes);
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-gray-800 px-4 py-3 sm:flex sm:px-6 pt-6 pb-6">
                            <DialogTitle as="h3" className="ml-4 text-2xl font-semibold text-white ">
                                {editMode ? "Reservierung bearbeiten" : "Neue Reservierung"}
                            </DialogTitle>
                            <XMarkIcon className="size-8 text-white ml-auto cursor-pointer" onClick={() => setOpen(false)}/>
                        </div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 mb-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left w-full ">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 w-full">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-lg/6 font-medium text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    readOnly={readOnly}
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className={classNames(
                                                        readOnly ? "bg-gray-200" : "bg-white",
                                                        "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="date" className="block text-lg/6 font-medium text-gray-900">
                                                Datum
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="date"
                                                    name="date"
                                                    type="text"
                                                    readOnly={readOnly}
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    className={classNames(
                                                        readOnly ? "bg-gray-200" : "bg-white",
                                                        "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="time" className="block text-lg/6 font-medium text-gray-900">
                                                Uhrzeit
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="time"
                                                    name="time"
                                                    type="text"
                                                    readOnly={readOnly}
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                    className={classNames(
                                                        readOnly ? "bg-gray-200" : "bg-white",
                                                        "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="count" className="block text-lg/6 font-medium text-gray-900">
                                                Anzahl
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="count"
                                                    name="count"
                                                    type="text"
                                                    readOnly={readOnly}
                                                    value={count}
                                                    min={1}
                                                    onChange={(e) => setCount(e.target.value)}
                                                    className={classNames(
                                                        readOnly ? "bg-gray-200" : "bg-white",
                                                        "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                        <div className="sm:col-span-full">
                                            <label htmlFor="contact" className="block text-lg/6 font-medium text-gray-900">
                                                Kontaktdaten
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="contact"
                                                    name="contact"
                                                    type="text"
                                                    readOnly={readOnly}
                                                    value={contact}
                                                    onChange={(e) => setContact(e.target.value)}
                                                    className={classNames(
                                                        readOnly ? "bg-gray-200" : "bg-white",
                                                        "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-lg/6 font-medium text-gray-900">
                                                Anmerkungen
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows={3}
                                                    readOnly={readOnly}
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    className={classNames(
                                                        readOnly ? "bg-gray-200" : "bg-white",
                                                        "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 pt-6 pb-6">
                            {
                                readOnly ? (
                                    <button
                                        type="button"
                                        onClick={() => setReadOnly(false)}
                                        className="cursor-pointer inline-flex w-36 justify-center rounded-md bg-yellow-400 px-3 py-2 text-lg font-semibold text-gray-900 shadow-xs hover:bg-yellow-300 ml-6 mr-4"
                                    >
                                        Bearbeiten
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="cursor-pointer inline-flex w-36 justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-xs hover:bg-blue-500 ml-6 mr-4"
                                    >
                                        Speichern
                                    </button>
                                )
                            }

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="cursor-pointer inline-flex w-36 justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-100 ml-6 mr-4"
                            >
                                Abbrechen
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
