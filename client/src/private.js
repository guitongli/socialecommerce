import { useEffect, useRef} from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Private(props) {
    // const dispatch = useDispatch();
    const hisMessages = useSelector((state) => {
        return (
            state.private_messages &&
            state.private_messages.filter((myMessage) => {
                return (
                    myMessage.sender_id == props.hisId ||
                    myMessage.recipient_id == props.hisId
                );
            })
        );
    });

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log('text', e.target.value)
            socket.emit("privateMessage", {
                content: e.target.value,
                hisId: props.hisId,
            });
             
            e.target.value = null;
        }
    };
    const elemRef = useRef();
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        console.log(
            "measurements",
            elemRef.current.scrollTop,
            elemRef.current.clientHeight,
            elemRef.current.scrollHeight

            // newRollTop
        );
        for (
            var i = 0;
            i < document.getElementsByClassName(props.hisId).length;
            i++
        ) {
            document.getElementsByClassName(props.hisId)[i].style.display =
                "flex";
            document.getElementsByClassName(props.hisId)[
                i
            ].style.flexDirection = "row-reverse";
        }
    }, [hisMessages]);
    var toggleWindow = false;
    function handleClick() {
        if (toggleWindow == false) {
            document.getElementsByClassName(
                "mychat__wrapper"
            )[0].style.display = "block";
            toggleWindow = !toggleWindow;
        } else {
            document.getElementsByClassName(
                "mychat__wrapper"
            )[0].style.display = "none";
            toggleWindow = !toggleWindow;
        }
    }
    return (
        <div className="mychat">
            <div className="friend-button">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}
                >
                    chat
                </button>
            </div>
            <div className="mychat__wrapper">
                <div className="mychat__window" ref={elemRef}>
                    {hisMessages &&
                        // console.log('in element', chatMessages)
                        hisMessages.map((hisMessage) => {
                            return (
                                <div
                                    className={hisMessage.sender_id}
                                    key={hisMessage.pm_id}
                                >
                                    <img src={hisMessage.pic} />
                                    {hisMessage.content}
                                </div>
                            );
                        })}
                </div>
                <div className="mychat__textarea">
                    <textarea
                        placeholder="hit enter to send"
                        onKeyDown={(e) => {
                            keyCheck(e);
                        }}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
