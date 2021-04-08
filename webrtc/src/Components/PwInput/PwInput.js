import React from 'react'
import './PwInput.css'

class PwInput extends React.Component{
    render(){
        return(
            <div>
                <label className="PwInput">
                    <input placeholder="Pw" type = "password"/>
                </label>
            </div>
        )
    }
}

export default PwInput