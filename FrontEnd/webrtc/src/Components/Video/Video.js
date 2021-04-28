import React from 'react'
import './Video.css'
import socketio from 'socket.io-client'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            localStream: null,
            isInit : false,
            pc : null
        }
    }
    gotLocalMediaStream = (mediaStream) => {
        document.getElementsByClassName('localVideo')[0].srcObject = mediaStream
        this.setState({ localStream : mediaStream })
    }
    handleLocalMediaStreamError = (error) => console.log('navigator.getUserMedia error: ', error)

    componentDidMount() {
        const socket = socketio.connect('http://localhost:8080')

        socket.on('joinRoom', (data) => {
            console.log(data.isInit)
            this.setState({isInit : data.isInit})
            if(this.state.isInit){ // Init
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(this.gotLocalMediaStream)
                .catch(this.handleLocalMediaStreamError)
            }
            else{ // Client
               
            }
        })
    }

    handleIceCandidate = (event) => {

    }

    handleClickStart = (event) => {
        navigator.mediaDevices.getUserMedia({video: true})
        .then((mediaStream) => {
            document.getElementsByClassName('remoteVideo')[0].srcObject = mediaStream
        })
    }

    render() {
        if(this.state.isInit === true)
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
        else
            return(
            <div>
                <script src='https://webrtc.github.io/adapter/adapter-latest.js'></script>
                    now you are client
            </div>)
    }
}
export default Video


