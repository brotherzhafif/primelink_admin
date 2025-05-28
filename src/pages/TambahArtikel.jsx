import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const TambahArtikel = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      const formData = new FormData();
      formData.append("judul_blog", judul);
      formData.append("isi_blog", deskripsi);
      if (foto) formData.append("gambar", foto);
      await axiosInstance.post("/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      setErrMsg(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setUploading(false);
    }
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
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          {/* Loading spinner saat upload */}
          {uploading && (
            <div className="mt-4 flex items-center gap-2 text-blue-500">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Uploading...</span>
            </div>
          )}
          {/* Preview gambar */}
          {preview && !uploading && (
            <img src={preview} alt="Preview" className="mt-4 max-h-48 rounded shadow" />
          )}
        </div>

        <div className="md:col-span-2">
          {errMsg && <div className="text-red-500 mb-2">{errMsg}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahArtikel;