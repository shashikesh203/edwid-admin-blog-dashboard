interface NavbarProps {
    onMenuToggle: () => void
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuToggle}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Blog Posts</h2>
                    </div>

                </div>
            </div>
        </header>
    )
}
