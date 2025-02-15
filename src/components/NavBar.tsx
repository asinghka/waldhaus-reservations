import { Disclosure } from '@headlessui/react'

const navigation = [
    { name: 'Heute', href: '#', current: true },
    { name: 'Reservierungen', href: '#', current: false },
    { name: 'Statistik', href: '#', current: false },
    { name: 'Admin', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    return (
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
    )
}