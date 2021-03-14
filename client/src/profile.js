import BioEditor from "./bio-editor";

export default function Profile(props) {
    console.log('profilepage', props);

    return (
        <div>
                <h1>{props.yourname}</h1>
            <img src={props.pic}></img>
        <p>{props.bio} {props.username}</p>
            
            <BioEditor oldbio = {props.bio} username = {props.username} updateBio={props.updateBio}/>
        </div>
    );
}
