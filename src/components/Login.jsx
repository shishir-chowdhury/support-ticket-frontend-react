import { useState } from "react";
import { login } from "../api/auth";
import Register from "./Register";
import "../App.css";

export default function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            setToken(res.data.token);
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    if (showRegister) {
        return <Register onBack={() => setShowRegister(false)} />;
    }

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded shadow font-semibold transition duration-200"
                >
                    Login
                </button>
            </form>

            {}
            <div className="mt-4 text-center">
                <button
                    onClick={() => setShowRegister(true)}
                    className="text-blue-600 hover:underline font-medium"
                >
                    Register
                </button>
            </div>
        </div>
    );
}
