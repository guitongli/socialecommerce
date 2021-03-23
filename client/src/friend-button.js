import { useEffect } from "react";
// import axios from "./axios";
import { useStage } from "./useStage";

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
        </div>
    );
}
//no relation, request sent, request received, request answered
