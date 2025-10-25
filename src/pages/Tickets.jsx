import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets, deleteTicket } from "../api/ticket";
import { me } from "../api/auth";

export default function Tickets({ token }) {
    const [tickets, setTickets] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch logged-in user info and tickets
    const fetchData = async () => {
        try {
            setLoading(true);

            // Get logged-in user info
            const userRes = await me(token);
            setUserRole(userRes.data.role);

            // Get tickets
            const ticketsRes = await getTickets(token);
            setTickets(ticketsRes.data);
        } catch (err) {
            console.error("Error fetching tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            try {
                await deleteTicket(id, token);
                fetchData();
            } catch (err) {
                console.error("Error deleting ticket:", err);
            }
        }
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Tickets</h2>
                <button
                    onClick={() => navigate("/tickets/add")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
                >
                    Add Ticket
                </button>
            </div>

            {/* Loading state */}
            {loading && (
                <p className="text-gray-500 text-center py-10">Loading tickets...</p>
            )}

            {/* Empty state */}
            {!loading && tickets.length === 0 && (
                <p className="text-gray-500 text-center py-10">No tickets found.</p>
            )}

            {/* Tickets Table */}
            {!loading && tickets.length > 0 && (
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">
                                Subject
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">
                                Category
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">
                                Priority
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">
                                User
                            </th>
                            <th className="px-4 py-3 text-center text-gray-700 font-medium min-w-[220px]">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {tickets.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50 transition" style={{ color: "#1f2937" }}>
                                <td className="px-4 py-3">{t.subject}</td>
                                <td className="px-4 py-3">{t.category || "-"}</td>
                                <td className="px-4 py-3 capitalize">{t.priority}</td>
                                <td className="px-4 py-3 capitalize">{t.status}</td>
                                <td className="px-4 py-3">{t.user?.name}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2 whitespace-nowrap">
                                        <button
                                            onClick={() => navigate(`/tickets/view/${t.id}`)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm whitespace-nowrap"
                                        >
                                            View
                                        </button>

                                        {/* Admin can edit/delete all tickets */}
                                        {userRole === "admin" && (
                                            <>
                                                <button
                                                    onClick={() => navigate(`/tickets/edit/${t.id}`)}
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow text-sm whitespace-nowrap"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm whitespace-nowrap"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
