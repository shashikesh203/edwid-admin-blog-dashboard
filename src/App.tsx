import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrowserRouter>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64 w-full">
          <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Routes>
            <Route path="/" element={<>Home page</>} />
            <Route path="/categories" element={<>Categories page</>} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
