import MainTable from "../components/MainTable.tsx";

export default function Today() {
    return (
        <div className="py-10">
            <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Heute am {new Date().toLocaleDateString("de-DE")}</h1>
                </div>
            </header>
            <main>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="mt-4 sm:mt-0 sm:ml-auto sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-lg font-regular text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Neue Reservierung
                            </button>
                        </div>
                    </div>
                    <MainTable/>
                </div>
            </main>
        </div>
    )
}