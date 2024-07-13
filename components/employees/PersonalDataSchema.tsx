interface PersonalData{
    employee: {
    user: {
        first_name:string;
        last_name: string;
        email: string;
        mobile: string;
        gender: string;
        date_of_birth: string;
        marital_status: string;
        address: string;   
    };
    bank_info:{
        bank_name: string;
        bank_code: string;
    }
    means_of_identification_type: string; 
    highest_qualification: string;
    linkedin_profile: string;
}
}


export default PersonalData