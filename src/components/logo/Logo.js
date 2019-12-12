import React from "react"
import './logo.css'

class Logo extends React.Component {
    constructor(props) {
        super()
        this.state = { xPos: 0, yPos: 0 }
    }

    componentDidMount() {

        
        setTimeout(() => {
        const yPos = Math.random() * (window.innerHeight - 400 );
        const xPos = Math.random() * (window.innerWidth - 400 );

        this.setState({ xPos: xPos, yPos: yPos })

        this.props.positionSelectedTrigger(xPos, yPos)

        }, 500)
        

    }

    render() {

        return (
            <div className={"logo"} style={{ left: this.state.xPos, top: this.state.yPos, opacity: this.state.xPos ? '1' : '0' }}><img src="https://www.rsveiendom.no/wp-content/uploads/2019/09/Dekode-660x386.jpg"></img></div>
        )
    }

}

export default Logo