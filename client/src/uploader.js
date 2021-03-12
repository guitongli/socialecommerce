import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            userId:'',
            password: '',
            error: false,
            file:''
        };
    }

    handleChange(e){
        console.log(e.target.files[0]);
        this.setState({file: e.target.files[0]});
    }

    handleClick(e) {
        // var file = myFileInput.files[0];
        var formData = new FormData();
        
        // formData.append('title', this.title);
        // formData.append("description", this.description);
        formData.append('file', this.file);
        // formData.append('description', this.description);
        formData.append('username', this.username);
        axios
            .post('/upload', formData)
            .then(response => {
                 console.log('uploaded', response)
                // axios
                //     .get('/gallery')
                //     .then(function (imagelist) {
                //         console.log(imagelist);
                //         self.images = imagelist.data;
                //         // console.log( "staying outside", imagelist.data);
                    // })
                    // .catch(function (err) {
                    //     console.log('error in axios', err);
                    // });
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <h1> to the antisocial network.</h1>
                {/* {this.state.error && <ErrorMsg />} */}
                <input 
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange = {e => this.handleChange()} 
                />
                <button onClick={e => this.handleClick()} value="submit">
                    upload</button>
            </div>
        );
    }

}