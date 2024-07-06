// export interface Employee {
//     id: string;
//     name: string;
//     gender: string;
//     email: string;
//     job_title: string;
//     department: string;
//     date_joined: string;
// }

interface Employee{
    id: string;
    user: {
        first_name:string;
        last_name: string;
        email: string;
        mobile: string;
        gender: string;
        date_of_birth: string;
        marital_status: string;
    };
    address:{
        street: string;
        country: string;
        state: string;
        postal_code: string;
        town: string;
        local_govt: string;
        city: string;
    },

    job_title: string;
    department: string;
    manager: string;
    work_location: string;
    last_promotion: string;
    employee_id: string;
    date_joined: string;
}


export default Employee