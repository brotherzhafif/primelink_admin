import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationGroup = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 text-xl disabled:text-gray-300"
      >
        &lt;
      </button>
      {getPaginationGroup().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full text-sm ${
              currentPage === page
                ? "bg-blue-900 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 text-xl disabled:text-gray-300"
      >
        &gt;
      </button>
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();

  // Dummy Data
  const data = [...Array(100)].map((_, i) => ({
    id: i + 1,
    title: "Macbook Pro 16",
    desc: "#123-456ABC",
    image: "123",
    category: "Apple"
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("title");

  const handleSearch = (item) => {
    const target = item[searchColumn].toLowerCase();
    return target.includes(searchTerm.toLowerCase());
  };

  const filteredData = data.filter(handleSearch);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Daftar Blog</h1>
        <button
          onClick={() => navigate("/tambah")}
          className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Tambah
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <select
            value={searchColumn}
            onChange={(e) => {
              setSearchColumn(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="title">Judul</option>
            <option value="desc">Deskripsi</option>
            <option value="category">Kategori</option>
          </select>
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-1 rounded w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.desc}</td>
                <td className="px-4 py-2">{item.image}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-4 text-gray-400">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Blog;