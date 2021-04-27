// import logo from './logo.svg';
import React from 'react'
import './App.css';
import {Header} from './Components/index'
import {LoginContainer, VideoContainer} from './Container/index'
import 'semantic-ui-css/semantic.min.css';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sucess: false
    }
  }

  setSucess = (result) => {
    this.setState({sucess : result})
  }

  render(){
    if(this.state.sucess === false)
      return (
        <div>
          <Header />
          <LoginContainer setSucess={this.setSucess}/>
        </div>
      )
    else
    return (
      <div>
        <Header />
        <VideoContainer setSucess={this.setSucess}/>
      </div>
    )
  }
}

export default App;
