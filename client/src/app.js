import React from "react";
import axios from "./axios";
import Avatar from "./avatar";

import Profile from "./profile";
import { Route, BrowserRouter, Link } from "react-router-dom";
import OtherProfile from "./other-profile";
import Logout from "./logout";
import Search from "./search";
import Friends from "./friends";
import ItemUpload from "./item-upload";
import ItemViewer from "./item-viewer";
import Chat from "./chat";
import Updates from './updates';
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            yourname: "",

            email: "",
            profilepic: null,
            bio: "",
            error: false,
            uploaderToggle: false,
            searchToggle: false,
            avatarToggle: true,
            logoutToggle: false,
        };

        this.handleImgClick = this.handleImgClick.bind(this);
        this.updateImg = this.updateImg.bind(this);
        this.handleSearchToggle = this.handleSearchToggle.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.handleAvatarToggle = this.handleAvatarToggle.bind(this);
        this.handleLogoutToggle = this.handleLogoutToggle.bind(this);
    }

    async componentDidMount() {
        console.log("check");
        const result = await axios.get("/api/user");
        this.setState({
            bio: result.data.bio,
            email: result.data.email,
            id: result.data.id,
            profilepic: result.data.pic,
            username: result.data.username,
            yourname: result.data.yourname,
        });

         
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
    handleSearchToggle() {
        this.setState({ searchToggle: !this.state.searchToggle });
    }
    handleLogoutToggle() {
        this.setState({ logoutToggle: !this.state.logoutToggle });
    }
    handleAvatarToggle() {
        console.log("toggle is activated");

        this.setState({ avatarToggle: !this.state.avatarToggle }, () => {
            console.log(this.state);
        });
        location.replace("/logout");
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul className="menu-nav">
                            <div className="menu-nav__item">
                                <Link to="/">
                                    <i className="fab fa-cuttlefish"></i>
                                </Link>
                            </div>
                            <Search
                                className="search"
                                profilepic={this.state.profilepic}
                                username={this.state.username}
                                updateImg={this.updateImg}
                            />
                            <div
                                onClick={this.handleMessageToggle}
                                className="menu-nav__item"
                            >
                                MESSENGER
                            </div>
                            <div
                                className="menu-nav__item logout"
                                onClick={this.handleLogoutToggle}
                            >
                                logout
                            </div>
                        </ul>

                        {this.state.logoutToggle && (
                            <Logout className="menu-nav__item logout" />
                        )}
                        {this.state.avatarToggle && (
                            <Avatar
                                className="menu-nav__item avatar"
                                username={this.state.username}
                                profilepic={this.state.profilepic}
                                handleImgClick={this.handleImgClick}
                                handleAvatarToggle={this.handleAvatarToggle}
                            />
                        )}
                    </nav>
                    <section>
                         
<Route
                            exact
                            path="/"
                            render={() => (
                                <div>
                                    <Updates
                                    />
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/profile"
                            render={() => (
                                <div>
                                    <Profile
                                        username={this.state.username}
                                        yourname={this.state.yourname}
                                        bio={this.state.bio}
                                        pic={this.state.profilepic}
                                        updateBio={this.updateBio}
                                        updateImg ={this.updateImg}
                                        id={this.state.id}
                                    />
                                </div>
                            )}
                        />
                        {/* <Route path="logout" component={Logout} /> */}
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/marketplace/:id"
                            render={(props) => (
                                <ItemViewer
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route
                            path="/logout"
                            render={() => (
                                <Logout
                                    username={this.state.username}
                                    id={this.state.id}
                                />
                            )}
                        />
                        <Route path="/friends" component={Friends} />

                        <Route path="/sell" component={ItemUpload} />
                        <Route path="/chat" component={Chat} />
                    </section>
                    <footer>copyright 2021 © Guitong Li</footer>
                </BrowserRouter>
            </div>
        );
    }
}
