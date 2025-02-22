import {Reservation} from "./types";

declare global {
    interface Window {
        electron: {
            getReservations: () => Promise<Reservation[]>;
            saveReservation: (reservation: Reservation) => Promise<void>;
            updateReservation: (reservation: Reservation) => Promise<void>;
        };
    }
}

export {};
