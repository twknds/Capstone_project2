import React from 'react'
import './Video.css'
// import 'https://webrtc.github.io/adapter/adapter-latest.js'

class Video extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            localStream : null
        }
    }

    gotLocalMediaStream = (mediaStream)=> {
        document.getElementsByClassName('localVideo')[0].srcObject = mediaStream
        this.setState({localStream : mediaStream})
    }
  
    handleLocalMediaStreamError = (error) => console.log('navigator.getUserMedia error: ', error)
    
    componentDidMount(){
        navigator.mediaDevices.getUserMedia({video:true})
        .then(this.gotLocalMediaStream)
        .catch(this.handleLocalMediaStreamError);

    }

    render(){
        return(
            <div>
                <script src='https://webrtc.github.io/adapter/adapter-latest.js'></script>
                <video className = 'localVideo' autoPlay playsInline />
            </div>
        )
    }
}
export default Video