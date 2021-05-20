import React from 'react'
import './Video.css'
import socketio from 'socket.io-client'
import axios from 'axios'

const pc_config = {
    iceServers : [
        {
            urls : 'stun:stun.l.google.com:19302'
        }
    ]
}

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isInit: false,
            socket: null
        }
    }

    componentDidMount() {
        const socket = socketio.connect('https://54.159.40.14:8080/')
        this.setState({ socket: socket })

        socket.on('joinRoom', (data) => {
            this.setState({ isInit: data.isInit })
            if(!data.isInit)
                sendSdpOffer()
        })

        const rtcPeerConnection = new RTCPeerConnection(pc_config)
        const sendMessage = (type, payload) => { socket.emit('message', { type, payload }) }
        const onMessage = (type, callback) => socket.on('message', message => {
            (message.type === type && callback(message.payload))
        })

        const sendSdpOffer = async () => {
            //요청을 보내는 사람
            const rtcSessionDescriptionInit = await rtcPeerConnection.createOffer();
            await rtcPeerConnection.setLocalDescription(rtcSessionDescriptionInit);
            await sendMessage('SDP', rtcSessionDescriptionInit)
        }

        const sendSdpAnswer = async () => {
            //요청을 받는사람
            const rtcSessionDescriptionInit = await rtcPeerConnection.createAnswer();
            await rtcPeerConnection.setLocalDescription(rtcSessionDescriptionInit);
            sendMessage('SDP', rtcSessionDescriptionInit);
        }

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(mediaStream => {
                document.getElementsByClassName('localVideo')[0].srcObject = mediaStream
                mediaStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track))
            })

        rtcPeerConnection.addEventListener('negotiationneeded', () => { })

        onMessage('SDP', async descriptionInit => {
            const rtcSessionDescription = new RTCSessionDescription(descriptionInit);

            await rtcPeerConnection.setRemoteDescription(rtcSessionDescription);

            if (descriptionInit.type === 'offer') {
                await sendSdpAnswer();
            }
        })

        //건들 필요 x
        rtcPeerConnection.addEventListener('icecandidate', e => e.candidate == null || sendMessage('ICE', e.candidate));
        onMessage('ICE', candidateInit => rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidateInit)))
        //

        rtcPeerConnection.addEventListener('track', e => {
            console.log(e)
            document.getElementsByClassName('remoteVideo')[0].srcObject = new MediaStream([e.track])
        });
    }

    render() {
        const isInit = this.state.isInit
        if(isInit)
            return (
                <div>
                    <p>
                        <video className='localVideo' autoPlay playsInline />
                    </p>
                    <video className='remoteVideo' autoPlay playsInline style={{display:"none"}}/>
                </div>
            )
        else
            return (
                <div>
                    <video className='localVideo' autoPlay playsInline style={{display:"none"}}/>
                    <p>
                        <video className='remoteVideo' autoPlay playsInline />
                    </p>
                </div>
            )
    }
}
export default Video