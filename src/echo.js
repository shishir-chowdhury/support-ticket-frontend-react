import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;
Pusher.logToConsole = true;

let echoInstance = null;

export const echo = (token) => {
    if (!echoInstance) {
        echoInstance = new Echo({
            broadcaster: "pusher",
            key: import.meta.env.VITE_PUSHER_KEY,
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            forceTLS: true,
            authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            },
        });
    }
    return echoInstance;
};