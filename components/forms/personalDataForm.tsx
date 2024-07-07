

import * as z from 'zod';


const formSchema = z.object({
  first_name: z.string().min(3,{
      message: 'first name must be at least 3 characters long'
  }),
  last_name: z.string().min(3,{
    message: 'last name must be at least 3 characters long'
}),
  mobile: z.string().min(9,{
      message: 'Invalid mobile number'
  }),
  gender: z.string().min(3,{
      message: 'gender must be at least 3 characters long'
  }),
  email: z.string().min(3,{
      message: 'email must be at least 3 characters long'
  }),
  means_of_identification_type: z.string().min(3,{
    message: 'email must be at least 3 characters long'
  }),
  password: z.string().min(3,{
    message: 'password is required'
}),
confirm_password: z.string().min(3,{
    message: 'password is required'
})
})