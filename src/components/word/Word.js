import React from "react"
import './word.css'

class Word extends React.Component {

    render() {
        return (
            <div className={"word"}>{this.props.word}</div>
        )
    }


}

export default Word