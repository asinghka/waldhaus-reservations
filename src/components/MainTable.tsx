import {CheckIcon} from "@heroicons/react/16/solid";

const people = [
    { name: 'Klaus', date: '15.2.2025', time: '18:00', count: '2', comment: false },
    { name: 'Caesar', date: '15.2.2025', time: '18:30', count: '4', comment: true }
]

export default function MainTable() {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pr-3 pl-4 text-xl font-semibold text-gray-900 sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900">
                                    Datum
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900">
                                    Uhrzeit
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-xl font-semibold text-gray-900">
                                    Anzahl
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-lg font-semibold text-gray-900">
                                    Anmerkung
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                                <tr key={person.name}>
                                    <td className="py-4 pr-3 pl-4 text-xl text-center font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                        {person.name}
                                    </td>
                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900">{person.date}</td>
                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900">{person.time}</td>
                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900">{person.count}</td>
                                    <td className="px-3 py-4 text-xl text-center whitespace-nowrap text-gray-900">{person.comment ? <div className="flex justify-center"><CheckIcon className="size-6"/></div>:''}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}