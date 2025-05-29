import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/admin-log.png"; // Pastikan gambar ini ada
const BASE_URL = "https://primelink-api.vercel.app/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrMsg("");
        try {
            const res = await axios.post(`${BASE_URL}/user/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            setErrMsg(err.response?.data?.message || "Login gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex">
            {/* Kiri: Gambar ilustrasi */}
            <div className="w-1/2 bg-[#0D1B45] flex items-center justify-center p-10">
                <img
                    src={loginImage}
                    alt="Ilustrasi Login"
                    className="max-w-md w-full"
                />
            </div>

            {/* Kanan: Form login */}
            <div className="w-1/2 bg-white flex items-center justify-center">
                <form onSubmit={handleSubmit} className="max-w-md w-full px-8">
                    <h1 className="text-3xl font-bold mb-2 text-[#0D1B45]">
                        Selamat datang !
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">
                        Masuk untuk melanjutkan akses ke CMS LinkPrime
                    </p>

                    {errMsg && <div className="text-red-500 mb-4">{errMsg}</div>}

                    <div className="mb-4">
                        <label className="block text-sm mb-1 text-gray-700">
                            Masukkan E-mail
                        </label>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm mb-1 text-gray-700">
                            Masukkan Kata Sandi
                        </label>
                        <input
                            type="password"
                            placeholder="Kata Sandi"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Masuk"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;