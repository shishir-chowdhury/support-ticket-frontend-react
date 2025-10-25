import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const echo = (token) =>
    new Echo({
        broadcaster: "pusher",
        key: import.meta.env.VITE_PUSHER_KEY,  // <- must match .env
        cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        forceTLS: true,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
