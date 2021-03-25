import {
    chatMessages,
    chatMessage,
    privateMessages,
    privateMessage,
    notifyMessage,
    notifyRequest
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

        socket.on("privateMessages", (msgs) => {
            console.log("private messages came", msgs);
            store.dispatch(privateMessages(msgs.private_messages.reverse()));
        });

        socket.on("privateMessage", (msgs) => {
            console.log("private message came", msgs);
            store.dispatch(privateMessage(msgs));
           
        });
        socket.on("message", (msgs) => {
            console.log("new message came", msgs);
             store.dispatch(notifyMessage(msgs));
        });
        socket.on("request", (user) => {
            console.log("new request came", user);
            store.dispatch(notifyRequest(user));
        });
    }
};
