import React from 'react'
import './Video.css'
import socketio from 'socket.io-client'

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

    logging = (type, data) => {
        console.log(type)
        console.log(data)
    }

    componentDidMount() {
        const socket = socketio.connect('https://34.201.135.5:8080/')
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
            this.logging('sendOffer',rtcSessionDescriptionInit)
            await rtcPeerConnection.setLocalDescription(rtcSessionDescriptionInit);
            await sendMessage('SDP', rtcSessionDescriptionInit)
        }

        const sendSdpAnswer = async () => {
            //요청을 받는사람
            const rtcSessionDescriptionInit = await rtcPeerConnection.createAnswer();
            this.logging('sendAnswer',rtcSessionDescriptionInit)
            await rtcPeerConnection.setLocalDescription(rtcSessionDescriptionInit);
            sendMessage('SDP', rtcSessionDescriptionInit);
        }


        // if(this.state.isInit)
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(mediaStream => {
                    document.getElementsByClassName('localVideo')[0].srcObject = mediaStream
                    mediaStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track))
                    // ?
                })
        // else

        rtcPeerConnection.addEventListener('negotiationneeded', () => { })

        onMessage('SDP', async descriptionInit => {
            const rtcSessionDescription = new RTCSessionDescription(descriptionInit);
            this.logging('get',rtcSessionDescription)

            //offer 입장에서는 answer를 받고 offer를 보내준다
            //answer입장에서는 offer를 받는다
            await rtcPeerConnection.setRemoteDescription(rtcSessionDescription);

            if (descriptionInit.type === 'offer') {
                await sendSdpAnswer();
            }
        })

        rtcPeerConnection.addEventListener('icecandidate', e => e.candidate == null || sendMessage('ICE', e.candidate));
        onMessage('ICE', candidateInit => rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidateInit)))

        rtcPeerConnection.addEventListener('track', e => document.getElementsByClassName('remoteVideo')[0].srcObject = new MediaStream([e.track]));
    }

    render() {
            return (
                <div>
                    <script src='https://webrtc.github.io/adapter/adapter-latest.js'></script>
                    <video className='localVideo' autoPlay playsInline />
                    <video className='remoteVideo' autoPlay playsInline />
                </div>
            )
    }
}
export default Video