export default function InputBox() {
    return (
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end py-4">
            <div className="relative max-w-md flex-1 hidden sm:block">
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>
    );
}
