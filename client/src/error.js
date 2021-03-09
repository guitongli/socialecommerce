function ErrorMsg (props) {
    const prop = props.error;
    if (prop){
    return (<p> check and put again</p>);
    } else {
        return (<p hidden>thank you</p>);
    }
};

export default ErrorMsg;