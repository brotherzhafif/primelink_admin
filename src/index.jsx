// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Blog from "./pages/Blog";
import TambahArtikel from "./pages/TambahArtikel";
import DaftarPermintaan from "./pages/DaftarPermintaan";
import EditBlog from "./pages/EditBlog";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/tambah" element={<TambahArtikel />} />
          <Route path="/permintaan" element={<DaftarPermintaan />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);