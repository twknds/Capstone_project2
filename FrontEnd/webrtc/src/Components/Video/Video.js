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
        let rtcPeerConnection
        this.setState({ socket: socket })

        socket.on('joinRoom', (data) => {
            this.setState({ isInit: data.isInit })
            rtcPeerConnection = new RTCPeerConnection(pc_config)
            if(!data.isInit){
                rtcPeerConnection.addEventListener('track', e => {
                    console.log(e)
                    console.log('this is not init')
                    document.getElementsByClassName('remoteVideo')[0].srcObject = new MediaStream([e.track])
                })
                sendSdpOffer()
            }
            else{
                navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(mediaStream => {
                        document.getElementsByClassName('localVideo')[0].srcObject = mediaStream
                        mediaStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track))
                })
                rtcPeerConnection.addEventListener('track', e => {
                    console.log(e)
                })
            }
            rtcPeerConnection.addEventListener('icecandidate', e => e.candidate == null || sendMessage('ICE', e.candidate));
            rtcPeerConnection.addEventListener('negotiationneeded', () => { })


            onMessage('SDP', async descriptionInit => {
                const rtcSessionDescription = new RTCSessionDescription(descriptionInit);

                await rtcPeerConnection.setRemoteDescription(rtcSessionDescription);

                if (descriptionInit.type === 'offer') {
                    await sendSdpAnswer();
                }
            })
        })

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

        //건들 필요 x
        onMessage('ICE', candidateInit => rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidateInit)))
        //

    }

    render() {
        if(this.state.isInit)
            return (
                <div>
                    <script src='https://webrtc.github.io/adapter/adapter-latest.js'></script>
                    <video className='localVideo' autoPlay playsInline />
                    {/* <video className='remoteVideo' autoPlay playsInline /> */}
                </div>
            )
        else{
            return (
                <div>
                    <script src='https://webrtc.github.io/adapter/adapter-latest.js'></script>
                    {/* <video className='localVideo' autoPlay playsInline /> */}
                    <video className='remoteVideo' autoPlay playsInline />
                </div>
            )
        }
    }
}
export default Video