import { useEffect } from "react";
// import axios from "./axios";
import { useStage } from "./useStage";
import Private from "./private";
import { socket } from "./sockets";

export default function FriendButton(props) {
    const [stage, getStage] = useStage();

    // const [relation, setRelation] = useState(null);
    // const [buttonText, setButtonText] = useState("add");

    useEffect(function () {
        getStage(props.hisId);
        
        console.log("prop id", props.hisId);
    }, []);

    function handleClick() {
        getStage(props.hisId);
        if (stage == 'add'){
            socket.emit("request", props.hisId);}
    }

    return (
        <div className="friend-button">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
            >
                {stage}
            </button>
            {stage == "friend" && <Private hisId={props.hisId} />}
        </div>
    );
}
//no relation, request sent, request received, request answered
