import { useState } from "react";
import { login } from "../api/auth";
import "../App.css"

export default function Login({ setToken }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            setToken(res.data.token);
            setMessage("Login successful!");
        } catch (err) {
            setMessage(err.response.data.error || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2" required />
                <button className="bg-green-500 text-white p-2 rounded">Login</button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}
