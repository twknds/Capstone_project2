import React from 'react'
import './IdInput.css'

class IdInput extends React.Component{
    render(){
        return(
            <div>
                <label className="IdInput">
                    <input placeholder = "Id" type = "text"/>
                </label>
            </div>
        )
    }
}
export default IdInput