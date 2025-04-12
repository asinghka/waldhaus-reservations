import { Disclosure } from '@headlessui/react'
import * as React from "react";
import {Link} from "react-router-dom";

const navigation = [
    { name: 'Heute', href: '/today', width: 'w-30' },
    { name: 'Reservierungen', href: '/reservations', width: 'w-48' },
    { name: 'Statistik', href: '/stats', width: 'w-32' },
    { name: 'Admin', href: '/admin', width: 'w-30' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const [activeTab, setActiveTab] = React.useState<string>('Heute')

    return (
        <Disclosure as="nav" className="border-b border-gray-200 bg-gray-800">
            <div className="mx-auto max-w-7xl px-8">
                <div className="flex h-24 items-center justify-between">
                    <div className="flex shrink-0">
                        <img
                            src="./assets/logo.png"
                            className="h-14 w-auto block"
                        />
                    </div>
                    <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setActiveTab(item.name)}
                                aria-current={activeTab === item.name ? 'page' : undefined}
                                className={classNames(
                                    activeTab === item.name ? 'bg-gray-900 text-white font-semibold outline-2 outline-gray-600' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-4 text-xl font-light text-center', item.width,
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}