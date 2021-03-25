import BioEditor from "./bio-editor";
import MyItems from "./items-my";
import Uploader from "./uploader";
// import { useState } from "react";
export default function Profile(props) {
    // const [toggleUploader, setToggleUploader] = useState(false);
    return (
        <div className="profile">
            <div className="profile__info">
                <h1>
                    {props.yourname} {props.username}
                </h1>
                <div>
                    <img
                        // onClick={setToggleUploader(true)}
                        src={props.pic}
                    ></img>
                    <Uploader
                        profilepic={props.pic}
                        username={props.username}
                        updateImg={props.updateImg}
                    />
                </div>
                {props.bio}
                <BioEditor
                    oldbio={props.bio}
                    username={props.username}
                    updateBio={props.updateBio}
                />
            </div>

            <div className="profile__itmes">
                <button
                    onClick={() => {
                        location.replace("/sell");
                    }}
                >
                    Sell
                </button>
                <MyItems />
            </div>
        </div>
    );
}
