import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import { Category } from "./pages/Category";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrowserRouter>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64 w-full">
          <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route
              path="/categories"
              element={<Category />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
