import { useState } from "react";
import { login } from "../api/auth";
import Register from "./Register";
import "../App.css";

export default function Login({ setToken }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await login(form);
            setToken(res.data.token);
        } catch (err) {
            setError(err.response?.data?.error || "Invalid credentials");
        }
    };

    if (showRegister) {
        return (
            <Register
                onBack={() => setShowRegister(false)}
                setSuccessMessage={setSuccessMessage}
            />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Login
                </h2>

                {successMessage && (
                    <p className="text-green-600 mb-4 text-center">
                        {successMessage}
                    </p>
                )}
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow font-semibold transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowRegister(true)}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Don’t have an account? Register
                    </button>
                </div>
            </div>
        </div>
    );
}
