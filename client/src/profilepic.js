export default function ProfilePic (props){
    return (
        <>
        <img onClick = {props.onClick()} src = {props.propfilepic}></img>
        </>
    )
}