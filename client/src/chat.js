import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => {
        console.log("arrived in chat", state && state.chat_messages);
        return state && state.chat_messages;
    });

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log('text', e.target.value)
            // socket.emit("chatMessage", e.target.value);
        }
    };

    const elemRef = useRef();
    useEffect(() => {
        console.log(
            "measurements",
            elemRef.current,
            elemRef.current.scrollTop,
            elemRef.current.scrollHeight,
            elemRef.current.clientHeight
        );
        elemRef.current.scrollTop =
            elemRef.current.scrollHeght - elemRef.current.clientHeight;
    }, []);
    useEffect(() => {
        if (chatMessages) {
            console.log("is it an array", chatMessages);
        }
    });
    return (
        <>
            <div className ='chat' ref={elemRef}>
                {chatMessages &&
                    // console.log('in element', chatMessages)
                    chatMessages.chat_messages.map((chatMessage) => {
                        return (
                            <div key={chatMessage.id}>
                                {chatMessage.username}
                                <img className = 'chat__item' src={chatMessage.pic} />
                                {chatMessage.content}
                            </div>
                        );
                    })}
                <textarea
                    placeholder="hit enter to send"
                    onKeyDown={(e) => {
                        keyCheck(e);
                    }}
                ></textarea>
            </div>
        </>
    );
}
