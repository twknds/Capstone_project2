import React from 'react'
import './Video.css'
import socketio from 'socket.io-client'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            localStream: null
        }
    }
    gotLocalMediaStream = (mediaStream) => {
        document.getElementsByClassName('localVideo')[0].srcObject = mediaStream
        this.setState({ localStream : mediaStream })
        const socket = socketio.connect('http://localhost:8080')
        socket.emit('localStream',{localStream: 'asd'})
        console.log(this.state.localStream)
    }
    handleLocalMediaStreamError = (error) => console.log('navigator.getUserMedia error: ', error)

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(this.gotLocalMediaStream)
            .catch(this.handleLocalMediaStreamError);

    }

    handleClickStart = (event) => {
        navigator.mediaDevices.getUserMedia({video: true})
        .then((mediaStream) => {
            document.getElementsByClassName('remoteVideo')[0].srcObject = mediaStream
        })
    }

    render() {
        return (
            <div>
                <script src='https://webrtc.github.io/adapter/adapter-latest.js'></script>
                <video className='localVideo' autoPlay playsInline />
                <video className='remoteVideo' autoPlay playsInline />
                <div>
                    <button className='startButton' onClick={this.handleClickStart}>Start</button>
                    <button className='callButton'>Call</button>
                    <button className='hangupButton'>Hang Up</button>
                </div>
            </div>
        )
    }
}
export default Video


