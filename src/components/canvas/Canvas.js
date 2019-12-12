import React from "react"
import EmployeeService from '../../services/EmployeeService'
import Employee from '../../components/employee/Employee'
import Logo from '../../components/logo/Logo'
import Word from '../../components/word/Word'
import './canvas.css'

class Canvas extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: [],
            pickEmployee: false,
            showLogo: false,
            words: []
        }

        this.employeePositions = []
        this.numberOfEmployeesStopped = 0;

        this.pickEmployee = this.pickEmployee.bind(this);
        this.employeeStopped = this.employeeStopped.bind(this);
        this.logoPositionSelected = this.logoPositionSelected.bind(this);
        this.pickWords = this.pickWords.bind(this);

    }

    componentDidMount() {

        this.setState({ employees: EmployeeService.getAllEmployees() })

        window.addEventListener('click', () => {
            this.pickEmployee();
        })
    }

    pickEmployee() {

        this.setState({ showLogo: true })

        setTimeout(() => this.setState({ pickEmployee: true }), (Math.random() * 5000) + 5000)

    }

    employeeStopped(id, x, y) {
        this.employeePositions[id] = { x: x, y: y, id: id }
        this.numberOfEmployeesStopped++;

        if (this.numberOfEmployeesStopped === this.state.employees.length) {
            this.calculateDistance();
        }
    }

    calculateDistance() {
        this.employeePositions.forEach((employeePosition, key) => {
            let x = Math.pow(this.logoPosition.x - employeePosition.x, 2)
            let y = Math.pow(this.logoPosition.y - employeePosition.y, 2)

            let distance = Math.sqrt(x + y);
            this.employeePositions[key].distance = distance

        })

        this.employeePositions.sort((employee1, employee2) => {
            return employee1.distance - employee2.distance
        })

        let employees = this.state.employees
        employees[this.employeePositions[0].id].closest = true

        this.setState({ employees: employees })

        this.pickWords();


    }

    async pickWords() {
        let words = await fetch('https://random-word-api.herokuapp.com/word?key=TU9U8W5Q&number=3');
        words = await words.json()

        this.setState({ words: words })


    }

    logoPositionSelected(x, y) {
        this.logoPosition = {
            x: x,
            y: y
        }

    }

    render() {
        const employeeHtml = this.state.employees.map((employee, key) =>
            <Employee key={key}
                image={employee.image}
                pickEmployee={this.state.pickEmployee}
                id={key}
                employeeStoppedTrigger={this.employeeStopped}
                closest={employee.closest}

            />
        );

        let wordsHtml;

        if (this.state.words.length) {
            wordsHtml = this.state.words.map((word, key) =>
                <Word key={key}
                    word={word}
                />
            );
        }

        return (
            <div>
                {employeeHtml}
                <div className={"words"}>
                    {wordsHtml}
                </div>
                {this.state.showLogo && (<Logo positionSelectedTrigger={this.logoPositionSelected} />)}
            </div>
        )
    }
}

export default Canvas