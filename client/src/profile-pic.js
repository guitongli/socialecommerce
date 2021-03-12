export default function ProfilePic (props){
    console.log(props);
    return (
        <>
        <img onClick = {props.handleImgClick} src = {props.profilepic}></img>
        </>
    );
}