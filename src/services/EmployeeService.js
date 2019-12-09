import Employees from '../assets/employees.json'

class EmployeeService {

    static getAllEmployees() {

        let employees = Employees[1]

        employees = employees.map((employee) => {
            return { image: employee}
        })

        return employees
    }

}

export default EmployeeService;