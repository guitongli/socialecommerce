import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import FriendButton from './friend-button';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            yourname: '',
            error: false,
            pic: '',
            file: '',
            bio: '', 
            id: '',
        };
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
    componentDidMount() {
        const currentVisitor = this.props.match.params.id;
        this.setState({ id: currentVisitor });
console.log(this.state.id);
        axios
            .get(`/api/${currentVisitor}`)
            .then(result => {
                console.log(result);
                const { username, yourname, bio, pic } = result.data;
                this.setState({ username: username, yourname: yourname, bio: bio, pic: pic });
            })
            .catch(err => console.log(err));
    }

    handleChange(e) {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    }

    handleClick(e) {
        // var file = myFileInput.files[0];
        console.log('click');
    }

    render() {
        return (
            <div className ='others'>
                <i className ='fab fa-twitter fa-2x'>
                  
                </i>
                 <h1>{this.state.username}</h1> 
                <img src={this.state.pic} />
                <h1>{this.state.yourname}</h1>
                <p>
                    {this.state.bio}
                </p>
                <FriendButton hisId ={this.props.match.params.id}/>
            </div>
        );
    }
}
