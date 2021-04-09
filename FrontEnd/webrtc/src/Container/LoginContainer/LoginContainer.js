import React from 'react'
import './LoginContainer.css'
import {IdInput, PwInput} from '../../Components'

class LoginContainer extends React.Component{
    render(){
        return(
            <div className = "LoginContainer">
                <h1>로그인</h1>
                <p>
                    <IdInput />
                </p>
                <p>
                    <PwInput />
                </p>
                <a href = "https://192.168.0.30:3000" >로그인</a>
            </div>
        )
    }
}

export default LoginContainer