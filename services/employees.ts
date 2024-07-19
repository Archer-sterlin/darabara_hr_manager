// employeeService.ts

import axios from 'axios';

// Create an Axios instance with default configuration
export const axiosInstance = axios.create({
  baseURL: 'https://chile64.pythonanywhere.com/api/v1',  // Replace with your actual API base URL
  timeout: 10000,  // Example timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all employees
export const fetchAllEmployees = async () => {
  try {
    const token = localStorage.getItem('access');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axiosInstance.get('/employees/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;  // Assuming your API returns data directly
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;  // Optionally handle or rethrow the error
  }
};

export const fetchEmployeeData = async (id=null) => {
  try {
    const token = localStorage.getItem('access');

    if (!token) {
      throw new Error('Not authorized----**');
    }
    if (id){
      const response = await axiosInstance.get(`/employees/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
      return response.data;
    }
    else{
      const response = await axiosInstance.get(`/employees/me/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;}
      // Assuming your API returns data directly
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;  // Optionally handle or rethrow the error
  }
};
