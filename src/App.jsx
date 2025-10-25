import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Tickets from "./pages/Tickets";
import TicketForm from "./components/TicketForm";
import { me } from "./api/auth";

export default function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            me(token).then((res) => setUser(res.data)).catch(() => setToken(null));
        }
    }, [token]);

    if (!token) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <Login setToken={setToken} />
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Support Ticket System</h1>
                        <p className="text-sm text-gray-600">{user?.name} ({user?.role})</p>
                    </div>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                        onClick={() => {
                            setToken(null);
                            setUser(null);
                        }}
                    >
                        Logout
                    </button>
                </header>

                <main className="p-8">
                    <Routes>
                        <Route path="/tickets" element={<Tickets token={token} />} />
                        <Route path="/tickets/add" element={<TicketForm token={token} />} />
                        <Route path="*" element={<Navigate to="/tickets" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
