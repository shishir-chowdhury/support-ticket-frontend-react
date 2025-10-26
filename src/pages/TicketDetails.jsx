import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicket, getComments, addComment } from "../api/ticket";
import { me } from "../api/auth";
import { echo } from "../echo";
import { MessageSquare, User, Tag, AlertCircle, Calendar } from "lucide-react";

export default function TicketDetails({ token }) {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const fetchTicket = async () => setTicket((await getTicket(id, token)).data);
    const fetchComments = async () => setComments((await getComments(id, token)).data);
    const fetchUser = async () => setUser((await me(token)).data);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        const tempMessage = { id: Date.now(), message: newComment, user, pending: true };
        setComments((prev) => [...prev, tempMessage]);
        setNewComment("");

        try {
            await addComment(id, newComment, token);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await Promise.all([fetchTicket(), fetchComments(), fetchUser()]);
            setLoading(false);
        };
        load();

        const echoInstance = echo(token);
        const channel = echoInstance.private(`ticket.${id}`);
        channel.listen("MessageSent", (e) => setComments((prev) => [...prev, e.comment]));
        return () => echoInstance.leave(`ticket.${id}`);
    }, [id]);

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
    if (!ticket) return <p className="text-center text-gray-500 mt-10">Ticket not found.</p>;

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-10 mt-10">
            {/* Header */}
            <div className="border-b pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageSquare className="text-indigo-600" /> {ticket.subject}
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">{ticket.description}</p>
                </div>
                <div className="mt-4 sm:mt-0 space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Category:</span> {ticket.category || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Priority:</span>{" "}
                        <span
                            className={`${
                                ticket.priority === "high"
                                    ? "text-red-600"
                                    : ticket.priority === "medium"
                                        ? "text-yellow-600"
                                        : "text-green-600"
                            } font-semibold capitalize`}
                        >
                            {ticket.priority}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Created By:</span>{" "}
                        {ticket.user?.name || "Unknown"}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={`px-2 py-1 rounded-full text-white text-xs ${
                                ticket.status === "open"
                                    ? "bg-blue-500"
                                    : ticket.status === "in_progress"
                                        ? "bg-yellow-500"
                                        : "bg-green-600"
                            }`}
                        >
                            {ticket.status.replace("_", " ")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    💬 Live Chat
                </h3>

                <div className="border rounded-lg bg-gray-50 p-4 mb-4 max-h-[500px] overflow-y-auto">
                    {comments.length === 0 && (
                        <p className="text-gray-500 text-center py-10">
                            No messages yet. Start the conversation below.
                        </p>
                    )}
                    {comments.map((c) => (
                        <div
                            key={c.id}
                            className={`flex mb-4 ${
                                c.user?.id === user?.id ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`p-3 rounded-lg shadow-sm max-w-[70%] ${
                                    c.user?.id === user?.id
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                                } ${c.pending ? "opacity-60" : ""}`}
                            >
                                <p className="text-sm">{c.message}</p>
                                <p className="text-xs mt-1 opacity-70">
                                    {c.user?.name} ({c.user?.role})
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form
                    onSubmit={handleAddComment}
                    className="flex items-center gap-3 border-t pt-4"
                >
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow font-medium"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
