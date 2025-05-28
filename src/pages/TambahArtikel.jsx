import { useState } from "react";

const TambahArtikel = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ judul, deskripsi, foto });
    // TODO: Integrasi dengan backend / simpan ke state
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Tambah Artikel</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-1">Judul</span>
            <input
              type="text"
              placeholder="Masukkan Judul"
              className="border border-gray-300 rounded px-3 py-2"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Deskripsi</span>
            <textarea
              placeholder="Tuliskan Deskripsi"
              className="border border-gray-300 rounded px-3 py-2 h-80 resize-none"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col items-center justify-center border border-dashed border-blue-400 rounded-lg p-6">
          <label className="cursor-pointer flex flex-col items-center text-blue-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l6-6 4 4 8-8" />
            </svg>
            <span>Masukkan Foto</span>
            <input type="file" className="hidden" onChange={(e) => setFoto(e.target.files[0])} />
          </label>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahArtikel;