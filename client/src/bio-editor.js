import React from 'react';
import axios from './axios';
// import { Link, Router } from 'react-router-dom';

// function ErrorMsg {
//         return <p>check your info and type again</p>;
//     }

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            username: '',
            error: false,
            editorVisible: false
        };
        this.showArea = this.showArea.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }

    componentDidMount() {
        console.log('bio props', this.props);
        this.setState({ bio: this.props.bio, username: this.props.username });
        // if (this.props.bio) {
        //     this.setState({ editorVisible: false });
        // }
    }
    async saveBio() {
        const result = await axios.post('/bio', this.state);
        console.log(result);
        this.props.updateBio(this.state.bio);
        this.setState({ editorVisible: false });
    }

    handleChange(e) {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }

    showArea() {
        this.setState({ editorVisible: true });
    }

    render() {
        if (this.state.editorVisible) {
            return (
                <div className="bio-editor">
                    <textarea name="bio" onChange={e => this.handleChange(e)} />
                    <button onClick={this.saveBio}>save</button>
                </div>
            );
        } else {
            if (!this.state.bio) {
                return <button onClick={this.showArea}>add</button>;
            } else {
                return (
                    <div>
                        
                        <button onClick={this.showArea}>edit</button>
                    </div>
                );
            }
        }
    }
}
