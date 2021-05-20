import React from 'react'
import './VideoContainer.css'
import {Video} from '../../Components'

class VideoContainer extends React.Component{
    render(){
        return(
        <div className = "VideoContainer">
            <Video />
        </div>)
    }
}

export default VideoContainer