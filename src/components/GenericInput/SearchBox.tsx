export default function SearchBox() {
    return (
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end py-4">
            <div className="relative max-w-md flex-1  sm:block">
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                    className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    );
}
