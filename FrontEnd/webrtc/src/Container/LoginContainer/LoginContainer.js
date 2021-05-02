import React from 'react'
import './LoginContainer.css'
import {IdInput, PwInput} from '../../Components'
import axios from 'axios'

class LoginContainer extends React.Component{
    constructor(props){
    super(props)
        this.state = {
            sucess : false,
            id : null,
            pw : null
        }
    }

    postSet = async () =>{
        axios.post(`https://18.221.65.255:8080/login`, {
            id : this.state.id,
            pw : this.state.pw
        })
        .then(() => {
            this.setState({sucess:true})
            this.props.setSucess(true)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    handleIDChange = (e) => {
       this.setState({
           id : e.target.value
       })
    }

    handlePWChange = (e) => {
        this.setState({
            pw : e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        this.postSet()
    }

    render(){
        return(
            <div className = "LoginContainer">
                <h1>로그인</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <IdInput onChange={this.handleIDChange}/>
                    </p>
                    <p>
                        <PwInput onChange={this.handlePWChange}/>
                    </p>
                    <input type='submit' value='Login' />
                </form>
            </div>
        )
    }
}

export default LoginContainer