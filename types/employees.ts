// export interface Employee {
//     id: string;
//     name: string;
//     gender: string;
//     email: string;
//     job_title: string;
//     department: string;
//     date_joined: string;
// }

export interface Employee{
    id: string;
    user: {
        first_name:string;
        last_name: string;
        email: string;
        mobile: string;
        gender: string;
        date_of_birth: string;
        marital_status: string;
        address: string
    }
    job_title: string;
    department: string;
    manager: string;
    work_location: string;
    last_promotion: string;
    employee_id: string;
    date_joined: string;
}

