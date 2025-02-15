import { Disclosure } from '@headlessui/react'

const navigation = [
    { name: 'Heute', href: '#', current: true },
    { name: 'Reservierungen', href: '#', current: false },
    { name: 'Statistik', href: '#', current: false },
    { name: 'Admin', href: '#', current: false },
]

const people = [
    { name: 'Klaus', date: '15.2.2025', time: '18:00', count: '2', comment: '-' },
    { name: 'Caesar', date: '15.2.2025', time: '18:30', count: '4', comment: 'x' }
    // More people...
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function App() {
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="border-b border-gray-200 bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-24 items-center justify-between">
                            <div className="flex shrink-0">
                                <img
                                    src="/assets/logo.png"
                                    className="hidden h-14 w-auto lg:block"
                                />
                            </div>
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-xl font-light',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Disclosure>

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
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-xl font-semibold text-gray-900 sm:pl-6">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">
                                                        Datum
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">
                                                        Uhrzeit
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900">
                                                        Anzahl
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                                        Anmerkung
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                {people.map((person) => (
                                                    <tr key={person.name}>
                                                        <td className="py-4 pr-3 pl-4 text-xl font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                            {person.name}
                                                        </td>
                                                        <td className="px-3 py-4 text-xl whitespace-nowrap text-gray-900">{person.time}</td>
                                                        <td className="px-3 py-4 text-xl whitespace-nowrap text-gray-900">{person.count}</td>
                                                        <td className="px-3 py-4 text-xl whitespace-nowrap text-gray-900">{person.date}</td>
                                                        <td className="px-3 py-4 text-xl whitespace-nowrap text-gray-900">{person.comment}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
