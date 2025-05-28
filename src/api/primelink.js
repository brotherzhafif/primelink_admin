const BASE_URL = "https://primelink-api.vercel.app/api";

export async function getBlogs() {
    const res = await fetch(`${BASE_URL}/blog`);
    if (!res.ok) throw new Error("Gagal mengambil data blog");
    return res.json();
}

export async function addBlog({ judul_blog, isi_blog, gambar }) {
    const formData = new FormData();
    formData.append("judul_blog", judul_blog);
    formData.append("isi_blog", isi_blog);
    if (gambar) formData.append("gambar", gambar);

    const res = await fetch(`${BASE_URL}/blog`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Gagal menambah blog");
    return res.json();
}

export async function deleteBlog(id) {
    const res = await fetch(`${BASE_URL}/blog/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Gagal menghapus blog");
    // Jangan parse JSON jika respons bukan JSON
    return true;
}

export async function updateBlog(id, { judul_blog, isi_blog, gambar }) {
    const formData = new FormData();
    formData.append("judul_blog", judul_blog);
    formData.append("isi_blog", isi_blog);
    if (gambar) formData.append("gambar", gambar);

    const res = await fetch(`${BASE_URL}/blog/${id}`, {
        method: "PUT",
        body: formData,
    });
    if (!res.ok) throw new Error("Gagal mengupdate blog");
    return res.json();
}

export async function getRequests() {
    const res = await fetch(`${BASE_URL}/request`);
    if (!res.ok) throw new Error("Gagal mengambil data permintaan layanan");
    return res.json();
}

export async function updateRequestStatus(id_request, status) {
    const res = await fetch(`${BASE_URL}/request/${id_request}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Gagal mengupdate status permintaan layanan");
    return res.json();
}

// Tambahkan fungsi lain sesuai kebutuhan (getBlogById, dll)
