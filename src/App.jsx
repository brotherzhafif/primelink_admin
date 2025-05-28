import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Blog from "./pages/Blog";
import TambahArtikel from "./pages/TambahArtikel";
import DaftarPermintaan from "./pages/DaftarPermintaan";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto h-screen">
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/tambah" element={<TambahArtikel />} />
            <Route path="/permintaan" element={<DaftarPermintaan />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
