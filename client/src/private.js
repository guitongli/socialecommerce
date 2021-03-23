import { useEffect, useRef, useDispatch } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Private(props) {
    // const dispatch = useDispatch();
    const hisMessages = useSelector((state)=>{
        return (
            state.myMessages &&
            state.myMessages.filter((myMessage) => {
                return (myMessage.sender_id == props.hisId ||myMessage.recipient_id == props.hisId) ;
            })
        );
    });
    

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log('text', e.target.value)
            socket.emit("privateMessage", {content:e.target.value, hisId:props.hisId});
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
    });

    return (
        <div className="mychat" ref={elemRef}>
            <div className="chat__wrapper">
                {hisMessages &&
                    // console.log('in element', chatMessages)
                    hisMessages.map((hisMessage) => {
                        return (
                            <div className="chat__item" key={chatMessage.id}>
                                {hisMessage.username}
                                <img src={hisMessage.pic} />
                                {hisMessage.content}
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
    );
}
