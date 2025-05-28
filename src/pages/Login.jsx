import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {errMsg && <div className="text-red-500 mb-4">{errMsg}</div>}
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="border px-3 py-2 rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="border px-3 py-2 rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <div className="mt-4 text-center">
                    <a href="/register" className="text-blue-600 hover:underline">
                        Belum punya akun? Register
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Login;
