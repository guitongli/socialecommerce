import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => {
        // console.log("arrived in chat", state && state.chat_messages);
        return state && state.chat_messages;
    });

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log('text', e.target.value)
           
            socket.emit("chatMessage", e.target.value);
             e.target.value = null;
        }
    };

    const elemRef = useRef();
    useEffect(() => {
        console.log();
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight;
        // elemRef.current.clientHeight;
        console.log(
            "measurements",
            elemRef.current.scrollTop,

            elemRef.current.scrollHeight,
            elemRef.current.clientHeight
            // newRollTop
        );
    },[chatMessages]);

    return (
        <>
            <div className="chat">
                <div className="chat__wrapper"  ref={elemRef}>
                    {chatMessages &&
                        // console.log('in element', chatMessages)
                        chatMessages.map((chatMessage) => {
                            return (
                                <div
                                    className="chat__item"
                                    key={chatMessage.id}
                                >
                                    <div>{chatMessage.username}</div>
                                    <img src={chatMessage.pic} />
                                    {chatMessage.content}
                                </div>
                            );
                        })}
                </div>
                <textarea
                    placeholder="hit enter to send"
                    onKeyDown={(e) => {
                        keyCheck(e);
                    }}
                ></textarea>
                ;
            </div>
        </>
    );
}
