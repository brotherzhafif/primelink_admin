import { useState } from "react";

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

const DaftarPermintaan = () => {
  // Dummy Data
  const data = [...Array(100)].map((_, i) => ({
    id: i + 1,
    namaLengkap: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    nomorHP: `0812345678${i}`,
    pesan: `Pesan nomor ${i + 1}`,
    status: i === 1 ? "Selesai" : i === 0 ? "Menunggu" : "Pending",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("namaLengkap");

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
      <h1 className="text-2xl font-semibold mb-6">Daftar Permintaan</h1>

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
            <option value="namaLengkap">Nama Lengkap</option>
            <option value="email">Email</option>
            <option value="nomorHP">Nomor HP</option>
            <option value="pesan">Pesan</option>
            <option value="status">Status</option>
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
              <th className="px-4 py-3">Nama Lengkap</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Nomor HP</th>
              <th className="px-4 py-3">Pesan</th>
              <th className="px-4 py-3 text-center">Status / Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.namaLengkap}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.nomorHP}</td>
                  <td className="px-4 py-2">{item.pesan}</td>
                  <td className="px-4 py-2 text-center">
                    {item.status === "Selesai" ? (
                      <span className="text-green-600 font-semibold">Selesai</span>
                    ) : item.status === "Menunggu" ? (
                      <span className="text-yellow-600 font-semibold">Menunggu</span>
                    ) : (
                      <>
                        <button className="text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
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

export default DaftarPermintaan;