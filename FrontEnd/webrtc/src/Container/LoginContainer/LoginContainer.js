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
        axios.post('http://localhost:8080/', {
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
                <form onSubmit={this.handleSubmit}>
                    <IdInput onChange={this.handleIDChange}/>
                    <PwInput onChange={this.handlePWChange}/>
                    <input type='submit' value='submit' />
                </form>
            </div>
        )
    }
}

export default LoginContainer