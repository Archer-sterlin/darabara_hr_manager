import  Employee  from "@/types/employees";

const employees: Employee [] = [
    {
        id: "1",
        user:{
            
            first_name: "John",
            last_name: "Doe",
            gender: "Male",
            email: "john.doe@example.com",
            mobile: "+2347018321",
            date_of_birth: "1994-04-22",
            marital_status: "single"
        },
        address: {
            street: "123 Main St",
            country: "1USA",
            city: "New York",
            state: "NY",
            postal_code: "10001",
            local_govt: "somewhere",
            town: "Manhattan"
        },
        job_title: "Software Engineer",
        department: "IT",
        manager: "John Doe",
        work_location: "New York",
        last_promotion: "2022-01-01",
        employee_id: "2022-01-01",
        date_joined: "2022-01-01",
    },
    {
        id: "2",
        user:{
            
            first_name: "Bruce",
            last_name: "wayne",
            gender: "Male",
            email: "batman@example.com",
            mobile: "+2347018321",
            date_of_birth: "1994-04-22",
            marital_status: "single"
        },
        address: {
            street: "123 Main St",
            country: "1USA",
            city: "New York",
            state: "NY",
            postal_code: "10001",
            local_govt: "somewhere",
            town: "Manhattan"
        },
        job_title: "Software Engineer",
        department: "IT",
        manager: "Bruce Wayne",
        work_location: "New York",
        last_promotion: "2022-01-01",
        employee_id: "2022-01-01",
        date_joined: "2022-01-01",
    },
    {
        id: "3",
        user:{
            
            first_name: "Clark",
            last_name: "Kent",
            gender: "Male",
            email: "superman@example.com",
            mobile: "+2347018321",
            date_of_birth: "1994-04-22",
            marital_status: "single"
        },
        address: {
            street: "123 Main St",
            country: "1USA",
            city: "New York",
            state: "NY",
            postal_code: "10001",
            local_govt: "somewhere",
            town: "Manhattan"
        },
        job_title: "Software Engineer",
        department: "IT",
        manager: "Clark Kent",
        work_location: "New York",
        last_promotion: "2022-01-01",
        employee_id: "2022-01-01",
        date_joined: "2022-01-01",
    }
    // Add more employees...
]

export default employees

