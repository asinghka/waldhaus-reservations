export default function Header({ title }: {title: string}) {
    return (
        <header className="shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold tracking-wide text-gray-900">{title}</h1>
            </div>
        </header>
    )
}