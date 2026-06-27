import Header from "../components/Header.tsx";
import ReservationTable from "../components/ReservationTable.tsx";
import {t, locale} from "../i18n.ts";

export default function Today() {
    return (
        <>
            <Header title={t('todayHeader') + new Date().toLocaleDateString(locale, { month: '2-digit', day: '2-digit', year: '2-digit' })}/>
            <main className="py-6">
                <div className="px-8 mx-auto max-w-7xl">
                    <ReservationTable filterDate={new Date()}/>
                </div>
            </main>
        </>
    )
}