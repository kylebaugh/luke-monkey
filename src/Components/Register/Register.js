import axios from "axios";
import { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import {updateUser} from './../../redux/reducer'
import './../Login/login.css'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        this.register = this.register.bind(this);
        this.confirmPasswordFunction = this.confirmPasswordFunction.bind(this)
    }

    register(){
        axios.post('/auth/register', this.state).then(res => {
            this.props.history.push('/')
        })
    }

    confirmPasswordFunction(pass1, pass2, buttonClick){
        if(pass1 === '' || pass2 === ''){
            return 'confirm-password-input-empty'
        }
        if(pass1 === pass2){
            if(buttonClick === true){
                this.register()
            }
        }else{
            return 'confirm-password-input-invalid'
        }
    }

    render(){
        return(
            <div className="registerbox-container">
                <div className="registerbox">
                    <h1 className='title'>Register</h1>
                    <input className='username-input' placeholder='username' onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input className='password-input' placeholder='password' type='password' onChange={(e) => this.setState({password: e.target.value})}></input>
                    <input className={`${this.confirmPasswordFunction(this.state.password, this.state.confirmPassword, false)}`} placeholder='Confirm Password' type='password' onChange={(e) => this.setState({confirmPassword: e.target.value})}></input>
                    <button id='register-button' onClick={() => {this.confirmPasswordFunction(this.state.password, this.state.confirmPassword, true)}}>Register</button>
                    <Link to='/' className='loginLink'><button>Already have an account? Login here!</button></Link>
                </div>
            </div>
        )
    }
}


export default Register