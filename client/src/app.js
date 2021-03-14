import React from 'react';
import axios from './axios';
import Avatar from './avatar';
import Uploader from './uploader';
import Profile from './profile';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import OtherProfile from './other-profile';
import Logout from './logout';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            yourname: '',

            email: '',
            profilepic: null,
            bio: '',
            error: false,
            uploaderToggle: false
        };

        this.handleImgClick = this.handleImgClick.bind(this);
        this.updateImg = this.updateImg.bind(this);
    }

    async componentDidMount() {
        console.log('check');
        const result = await axios.get('/user');
                    this.setState({
                        bio: result.data.bio,
                        email: result.data.email,
                        id: result.data.id,
                        profilepic: result.data.pic,
                        username: result.data.username,
                        yourname: result.data.yourname
                    });

        if (!this.state.profilepic == ' ') {
            this.setState({
                profilepic: 'https://d33epyjwhmr3r5.cloudfront.net/cms/images/sandbox/madhuontap.svg'
            });
        }
    }

    updateImg(pic) {
        this.setState({ profilepic: pic });
    }
    updateBio(biotext) {
        this.setState({ bio: biotext });
    }
    handleImgClick() {
        this.setState({ uploaderToggle: !this.state.uploaderToggle });
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
            <BrowserRouter>
                <Route
                    exact
                    path="/"
                    render={() =>
                        <div>
                            <Avatar
                                className="avatar"
                                username={this.state.username}
                                profilepic={this.state.profilepic}
                                handleImgClick={this.handleImgClick}
                            />
                            {this.state.uploaderToggle &&
                                <Uploader
                                    className="zoomAvatar"
                                    profilepic={this.state.profilepic}
                                    username={this.state.username}
                                    updateImg={this.updateImg}
                                />}

                            <Profile
                                username={this.state.username}
                                yourname={this.state.yourname}
                                bio={this.state.bio}
                                pic={this.state.profilepic}
                                updateBio={this.updateBio}
                                id={this.state.id}
                            />
                        </div>}
                />
                <Route
                    path="/user/:id"
                    render={props => <OtherProfile key={props.match.url} match={props.match} history={props.history} />}
                />
                <Route path="/logout" render={() => <Logout username={this.state.username} id={this.state.id} />} />
            </BrowserRouter>
        );
    }
}
