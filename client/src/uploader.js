import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
            username:'',
          
            error: false,
            pic: '',
            file: ''
        };
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
    componentDidMount() {
       
        this.setState({ pic: this.props.profilepic, username:this.props.username });
         console.log(this.props.username);
    }

    handleChange(e) {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    }

    handleClick(e) {
        // var file = myFileInput.files[0];
        console.log('click', this.state.username);
        var formData = new FormData();

        formData.append('file', this.state.file);
        // formData.append('description', this.description);
        formData.append('username', this.state.username);
        
        axios
            .post('/avatar', formData)
            .then(response => {
                if (response.data.success ==true){
                    this.setState({pic:response.data.pic});
                    this.props.updateImg(response.data.pic);
                }
              
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                {/* {this.state.error && <ErrorMsg />} */}

                <img src={this.state.pic} />
                <input type="file" name="file" accept="image/*" onChange={(e) => this.handleChange(e)} />
                <button onClick={e => this.handleClick()}>
                    upload
                </button>
            </div>
        );
    }
}
