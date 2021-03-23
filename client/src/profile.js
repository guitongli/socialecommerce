import BioEditor from "./bio-editor";
import MyItems from "./items-my";
import Uploader from "./uploader";
import { useState, useEffect } from "react";
export default function Profile(props) {
    const [toggleUploader, setToggleUploader] = useState(false);
    return (
        <div className="profile">
            <h1>{props.yourname}</h1>
            <img
                // onClick={setToggleUploader(true)}
                src={props.pic}
            ></img>
            <p>{props.username}</p>
            {props.bio}

            {/* {toggleUploader && ( */}
            <Uploader
                className="uploader"
                profilepic={props.pic}
                username={props.username}
                updateImg={props.updateImg}
            />
            {/* )} */}
            <MyItems />
            <BioEditor
                oldbio={props.bio}
                username={props.username}
                updateBio={props.updateBio}
            />
        </div>
    );
}
