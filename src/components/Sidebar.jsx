import logo from "../assets/primelink-logoW.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiFileText, FiPlusCircle, FiList, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded ${pathname === path ? "bg-blue-100 text-blue-600" : "text-white hover:bg-blue-800"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#021536] text-white flex flex-col justify-between items-center">
      <div>
        <div className="p-6 flex justify-center">
          <img src={logo} alt="Primelink Logo" className="w-36" />
        </div>

        <nav className="mt-6 space-y-2">
          <Link to="/" className={linkClass("/")}>
            <FiFileText /> Blog
          </Link>
          <Link to="/tambah" className={linkClass("/tambah")}>
            <FiPlusCircle /> Tambah Artikel
          </Link>
          <Link to="/permintaan" className={linkClass("/permintaan")}>
            <FiList /> Daftar Permintaan
          </Link>
        </nav>
      </div>

      <div className="p-4">
        <button
          className="flex items-center gap-2 text-white hover:text-red-500"
          onClick={handleLogout}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;