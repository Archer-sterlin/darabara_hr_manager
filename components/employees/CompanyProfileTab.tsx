import Employee from "./CompanyProfileSchema";

const CompanyProfileTab = ({ employee }: Employee) => {
    return ( 
        <>
            <h1 className=" text-gray-500 text-3xl title-font font-medium mb-4">{employee?.user?.first_name} {employee?.user?.last_name}</h1>
                <div className="flex mb-4">
                    <a className="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Employee Profile</a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
                </div>
        
            <div className="flex  py-2">
            <span className="text-gray-500">Job Title</span>
            <span className="ml-auto text-gray-500">{employee?.job_title}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Department</span>
            <span className="ml-auto text-gray-500">{employee?.department}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Manger</span>
            <span className="ml-auto text-gray-500">Sister Magret</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Work Location</span>
            <span className="ml-auto text-gray-500">Manhattan</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Last Promotion</span>
            <span className="ml-auto text-gray-500">21-05-2017</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Date Joined</span>
            <span className="ml-auto text-gray-500">21-05-2011</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
            <span className="text-gray-500">Employee ID</span>
            <span className="ml-auto text-gray-500">THXFS_2024</span>
            </div>
        
        </>
 

     );
}
 
export default CompanyProfileTab;