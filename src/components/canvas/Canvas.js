import React from "react"
import EmployeeService from '../../services/EmployeeService'

class Canvas extends React.Component {
    componentDidMount() {
        EmployeeService.getAllEmployees();

    }
    render() {
        return (
            <h1>Hei</h1>
        )
    }
}

export default Canvas