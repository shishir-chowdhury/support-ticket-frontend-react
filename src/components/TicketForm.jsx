import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../api/ticket";

export default function TicketForm({ token }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        subject: "",
        description: "",
        category: "",
        priority: "low",
        attachment: null,
    });
    const [attachmentName, setAttachmentName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "attachment") {
            const file = e.target.files[0];
            setForm({ ...form, attachment: file });
            setAttachmentName(file ? file.name : "");
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(form).forEach((key) => {
                if (form[key] !== null) data.append(key, form[key]);
            });

            await createTicket(data, token);

            // Show success message
            setSuccessMessage("Your Ticket Has Been Successfully Published");

            // Reset form
            setForm({
                subject: "",
                description: "",
                category: "",
                priority: "low",
                attachment: null,
            });
            setAttachmentName("");

            // Optionally redirect after a short delay
            setTimeout(() => navigate("/tickets"), 1500);
        } catch (err) {
            console.error("Error creating ticket:", err);
            alert(err.response?.data?.message || "Failed to create ticket");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Add Ticket
            </h2>

            {successMessage && (
                <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.subject}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="4"
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.category}
                    onChange={handleChange}
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div>
                    <input type="file" name="attachment" onChange={handleChange} />
                    {attachmentName && (
                        <p className="mt-1 text-gray-700 text-sm">
                            Selected file: {attachmentName}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
