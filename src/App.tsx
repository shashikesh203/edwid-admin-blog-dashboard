import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrowserRouter>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64 w-full">
          <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/categories" element={<div className=" px-4 sm:px-6 lg:px-8 py-6">Categories page</div>} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
