import { useState } from "react";
import { register } from "../api/auth";

export default function Register({ onBack }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const res = await register(form);
            setMessage("Registered successfully! Token: " + res.data.token);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Register
            </h2>

            {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded shadow font-semibold transition duration-200"
                >
                    Register
                </button>
            </form>

            {/* Back to Login Button */}
            <div className="mt-4 text-center">
                <button
                    onClick={onBack}
                    className="text-blue-600 hover:underline font-medium"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}
