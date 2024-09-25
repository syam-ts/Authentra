import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminEditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/admin/admin-edit/${userId}`);
        const userData = res.data;
        console.log("The data : ", userData);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [])

  

  return (
    <div className="h-full mx-96">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto p-20 lg:w-5/12 bg-cover rounded-l-lg">
               <img src={user.profilePicture} />
               <button className='font-thin h-12 w-28 pt-12 underline text-blue-600'> Edit Image </button>
            </div>

            <div className="w-full lg:w-7/12 bg-white :bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 :text-white">
                Create an Account!
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white :bg-gray-800 rounded">
                <div className="mb-4 grid gap-6 md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 :text-white">
                      User Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 :text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder={user.username}
                    />
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 :text-white">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 :text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder={user.email}
                    />
                  </div>

                  
            


                </div>
            
                
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 :bg-blue-700 :text-white :hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                   Update User
                  </button>
                </div>
                <hr className="mb-6 border-t" />
            
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEditUser;
