// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Blog from "./pages/Blog";
import TambahArtikel from "./pages/TambahArtikel";
import DaftarPermintaan from "./pages/DaftarPermintaan";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/tambah" element={<TambahArtikel />} />
          <Route path="/permintaan" element={<DaftarPermintaan />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);