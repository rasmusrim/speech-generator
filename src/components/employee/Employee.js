import React from "react"
import './employee.css'

class Employee extends React.Component {
    constructor(props) {
        super()
        this.state = {
            width: 0,
            height: 0
        }


        this.resetPosition = this.resetPosition.bind(this)
        this.makeLarger = this.makeLarger.bind(this)
    }

    componentDidMount() {
        

        setTimeout(() => {
            this.setState({ width: window.innerWidth, height: window.innerHeight })

            const yPos = (Math.random() * this.state.height);
            this.setState({ yPos: yPos, speed: (Math.random() * 30) + 50 });


            this.resetPosition();
            setInterval(() => this.move(), 200)
        }, 1000);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.closest !== this.props.closest) {
            this.makeLarger();
        }
    }

    makeLarger() {
        this.setState({})
    }

    resetPosition() {
        this.setState({ xPos: (Math.random() * this.state.width - 200) })
    }

    move() {

        if (this.props.pickEmployee && this.state.speed > 10) {
            let speed = this.state.speed;
            speed *= 0.9
            this.setState({ speed: speed })
        } else if (this.state.speed !== 0 && this.state.speed <= 10) {
            let speed = 0
            this.setState({ speed: speed })
            this.props.employeeStoppedTrigger(this.props.id,this.state.xPos,this.state.yPos)
        }

        let y = this.state.yPos;
        y += this.state.speed

        if (y > this.state.height) {
            y = 0;
            this.resetPosition();
        }

        this.setState({ yPos: y })

    }

    render() {
        return (
            <div className={"employee-image"}>
                <img src={this.props.image} alt="" style={{ 
                    left: this.props.closest ? '50%' : this.state.xPos, 
                    top: this.props.closest ? 0 : this.state.yPos, 
                    transform: this.props.closest ? 'translateX(-50%)' : 'initial',
                    transition: this.state.yPos === 0 ? '' : 'top .2s linear',
                    zIndex: this.props.closest ? 1000 : 0,
                    width: this.props.closest ? 'auto' : '140px',
                    height: this.props.closest ? '100%' : 'auto',

                     }} />

            </div>

        )
    }

}

export default Employee