import { useState } from "react";
import { register } from "../api/auth";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            setMessage("Registered successfully! Token: " + res.data.token);
        } catch (err) {
            setMessage(err.response.data.error || "Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2" required />
                <select name="role" onChange={handleChange} className="border p-2">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}
