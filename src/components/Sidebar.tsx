import { NavLink } from "react-router-dom"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
            <aside
                className={`w-64 bg-gray-900 text-white fixed left-0 top-0 bottom-0 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({ backgroundColor: isActive ? "#4B5563" : "transparent", })}
                        className="flex items-center gap-3 px-4 py-3  text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                        <span>All Posts</span>
                    </NavLink>
                    <NavLink
                        to="/categories"
                        style={({ isActive }) => ({ backgroundColor: isActive ? "#4B5563" : "transparent", })}
                        className="flex items-center gap-3 px-4 py-3  text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                        </svg>
                        <span>Categories</span>
                    </NavLink>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                            FN
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Admin User</p>
                            <p className="text-xs text-gray-400 truncate">admin@foodninja.com</p>
                        </div>
                    </div>
                </div>
            </aside >
        </>
    )
}
