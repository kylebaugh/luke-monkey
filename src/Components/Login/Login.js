import Axios from "axios";
import { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateUser} from './../../redux/reducer'
import './login.css'
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            signInValid: true
        }
        this.login = this.login.bind(this);
    }

    login(){
        Axios.post('/auth/login', this.state).then(res => {
            if(this.state.username === '' || this.state.password === ''){
                this.setState({signInValid: false})
                return
            }
            this.props.updateUser(res.data);
            this.props.history.push('/yourdex')
        })
        .catch((err) => {
            if(err){
                this.setState({signInValid: false})
            }
            })
    }

    render(){
        return(
            <div className="loginbox-container">
                <div className="loginBox">
                    <h2 className='title'>Login</h2>
                    <div className="login-inputs">
                        {this.state.signInValid ? null : <div className="login-invalid">The Username/Password you've entered was incorrect</div>}
                        <input className='username-input' placeholder='Username' onChange={(e) => this.setState({username: e.target.value})}></input>
                        <input className='password-input' placeholder='Password' type='password' onChange={(e) => this.setState({password: e.target.value})}></input>
                        <button className="login-button" onClick={this.login}>Login</button>
                    </div>
                        <Link to='/register'><button className="registerLink">Dont have an account? Register here!</button></Link>
                </div>
            </div>
        )
    }
}


export default connect(null, {updateUser})(Login)