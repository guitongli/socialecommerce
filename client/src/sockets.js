import {
    chatMessages,
    chatMessage,
    privateMessages,
    privateMessage,
} from "./actions";
import { io } from "socket.io-client";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            console.log("messages came", msgs);
            store.dispatch(chatMessages(msgs.chat_messages.reverse()));
        });

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
        socket.on("privateMessage", (msgs) => {
            console.log("private messages came", msgs);
            store.dispatch(privateMessages(msgs.private_messages));
        });
        socket.on("privateMessage", (msgs) => {
            console.log("private message came", msgs);
            store.dispatch(privateMessage(msgs));
        });
    }
};
