export type Lang = 'en' | 'de';
export const lang = 'en' as Lang;

export const locale = lang === 'de' ? 'de-DE' : 'en-US';
export const dayjsLocale = lang === 'de' ? 'de' : 'en';

const dict = {
    en: {
        today: 'Today',
        reservations: 'Reservations',
        statistics: 'Statistics',
        admin: 'Admin',
        todayHeader: 'Today, ',
        reservationsOverview: 'Reservations Overview',
        statsTitle: 'Reservation Statistics',
        deletedReservations: 'Deleted Reservations',
        name: 'Name',
        date: 'Date',
        time: 'Time',
        count: 'Guests',
        notesShort: 'Notes',
        editReservation: 'Edit Reservation',
        newReservation: 'New Reservation',
        contact: 'Contact',
        notes: 'Notes',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        restore: 'Restore',
        noReservations: 'No reservations ...',
        break: 'Break',
        people: 'Guests',
        month: 'Month',
        monthView: 'Month view',
        yearView: 'Year view',
    },
    de: {
        today: 'Heute',
        reservations: 'Reservierungen',
        statistics: 'Statistik',
        admin: 'Admin',
        todayHeader: 'Heute am ',
        reservationsOverview: 'Reservierungen im Überblick',
        statsTitle: 'Statistik zu Reservierungen',
        deletedReservations: 'Gelöschte Reservierungen',
        name: 'Name',
        date: 'Datum',
        time: 'Uhrzeit',
        count: 'Anzahl',
        notesShort: 'Anm.',
        editReservation: 'Reservierung bearbeiten',
        newReservation: 'Neue Reservierung',
        contact: 'Kontakt',
        notes: 'Anmerkungen',
        cancel: 'Abbrechen',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        save: 'Speichern',
        restore: 'Wiederherstellen',
        noReservations: 'Keine Reservierungen vorhanden ...',
        break: 'Pause',
        people: 'Personen',
        month: 'Monat',
        monthView: 'Monatsansicht',
        yearView: 'Jahresansicht',
    },
} as const;

export const t = (key: keyof typeof dict['en']): string => dict[lang][key];

export const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i, 1).toLocaleDateString(locale, { month: 'long' })
);

export const weekdaysShort = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i).toLocaleDateString(locale, { weekday: 'short' })
);
