export default function Divider() {
    return (
        <div className="relative p-8">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-gray-50 px-2 text-xl text-gray-500">Pause</span>
            </div>
        </div>
    )
}