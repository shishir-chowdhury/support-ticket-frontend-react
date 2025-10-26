import { useState } from "react";
import { register } from "../api/auth";

export default function Register({ onBack, setSuccessMessage }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(form);
            setSuccessMessage("You have been successfully registered. Please log in.");
            onBack();
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Register
                </h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

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

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`${
                            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        } text-white p-4 rounded-lg shadow font-semibold transition duration-200`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={onBack}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}
