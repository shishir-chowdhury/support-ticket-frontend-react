import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
    const [token, setToken] = useState(null);

    return (
        <div className="p-4">
            {!token ? <Login setToken={setToken} /> : <Register />}
            {/*{token && <p className="mt-4">Logged in! Token: {token}</p>}*/}
        </div>
    );
}
