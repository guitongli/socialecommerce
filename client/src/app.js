import React from 'react';
import axios from './axios';
import ProfilePic from './profile-pic';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            profilepic: null,
            bio: '',
            error: false,
            uploaderToggle: false
        };
    }

    componentDidMount() {
        // console.log('check');

        axios.get('/user').then(result => {
            console.log(result);
            this.setState({
                bio: result.data.bio,
                email: result.data.email,
                id: result.data.id,
                profilepic: result.data.pic,
                username: result.data.username,
                yourname: result.data.yourname
            });
            if (!this.state.profilepic) {
            this.setState({ profilepic: 'https://d33epyjwhmr3r5.cloudfront.net/cms/images/sandbox/madhuontap.svg' });
        }
        });
        
    }
    
   handleImgClick(){
        this.setState({uploaderToggle: !this.state.uploaderToggle});
    }

    // handleClick(e) {

    //     console.log(e);
    //     axios
    //         .post('/signup', this.state)
    //         .then(result => {
    //             console.log(result);
    //             location.replace('/');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             this.setState({ error: true });
    //         });
    // }

    // handleChange(e) {
    //     console.log(e.target.name);
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    //     console.log(this.state);
    // }

    render() {
        return (
            <div>
                <ProfilePic profilepic={this.state.profilepic} handleImgClick={this.handleImgClick} />
                {this.state.uploaderToggle && <Uploader />}
                <button>Logout</button>
            </div>
        );
    }
}
