import { useState } from "react";
import uploadIcon from "../assets/upload-foto.png"; // pastikan ini ada
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const TambahArtikel = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFotoChange = (e) => {
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

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold text-[#0D1B45] mb-6">Tambah Artikel</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Kolom Kiri */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Judul
            </label>
            <input
              type="text"
              placeholder="Masukkan Judul"
              className="w-full border border-gray-300 rounded-lg px-6 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              placeholder="Tuliskan Deskripsi"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-64 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col justify-between">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Masukan Foto
          </label>
          <label className="border-2 border-dashed border-blue-400 rounded-xl p-10 flex flex-col items-center justify-center text-blue-600 hover:bg-blue-50 transition cursor-pointer min-h-[300px]">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-contain rounded"
              />
            ) : (
              <>
                <img
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="w-16 h-16 mb-4"
                />
                <span className="text-center text-sm font-medium">
                  Masukkan Foto
                </span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFotoChange}
            />
          </label>

          {/* Spinner saat upload */}
          {uploading && (
            <div className="text-sm text-blue-500 mt-2">Uploading preview...</div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
          {errMsg && <div className="text-red-500 mt-2 text-sm">{errMsg}</div>}
        </div>
      </form>
    </div>
  );
};

export default TambahArtikel;