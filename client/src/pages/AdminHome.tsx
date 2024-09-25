import { useEffect, useState } from "react";
import Header from "../component/Header";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { updateUserStart } from "../redux/user/userSlice";
import { Link } from "react-router-dom";

function AdminHome() {

    interface Users {
        _id: number,
        profilePicture: string,
        username: string,
        email: string,
        createdAt: string
    }

    interface FormData {
        username?: string;
        email?: string;
        password?: string;
        profilePicture?: string;
      }

  const [users, setUsers]  = useState<Users[]>([])
  const [formData, setFormData] = useState<FormData>({})
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("/api/user/admin/users")
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const handleEdit = async (e: any) => {  
    console.log(users._id)
      e.preventDefault();
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${users._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        console.log('data',res)
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data))
          return;
        }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      } catch (error) {
        dispatch(updateUserFailure(error));
        console.log('error')
      }
    }

  return (
    <div>
      <span className="pb-12 m-12">.</span>
      <Header />

      <div className="relative pb-[1000px] overflow- px-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-stone-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile Picture
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
              created
              </th>
            </tr>
          </thead>
          <tbody className='h-[200px]'>
            {users.map((user) => (
              <tr className="border-b border-black" key={user._id}>
               
                <td className="px-6 py-4 w-1"><img src={user.profilePicture} /></td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4"><div className='flex gap-5'>
                {new Date(user.createdAt)
                  .toLocaleDateString('en-GB', { day: '2-digit', month: 'numeric', year: 'numeric' })}
             
           <Link to='admin-edit'>
           
                 <button className='h-1 w-5'
                 >
                    <img src="https://img.icons8.com/?size=80&id=88sXsrqGPpa0&format=png" />
                  </button>
                  </Link>
                  <button className='h-1 w-5'>
                    <img src="https://img.icons8.com/?size=48&id=pre7LivdxKxJ&format=png" />
                  </button>
           
                </div>
                </td>
                </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </div>
  );
}



//admin edit
export const AdminEdit = () => {

    return (
  <div className='p-44'> 
  <form className="max-w-sm mx-auto">
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium">Profile Picture</label>
      <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
    </div>
    <div className="mb-5">
      <label   className="block mb-2 text-sm font-medium ">Username</label>
      <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>
    <div className="mb-5">
      <label  className="block mb-2 text-sm font-medium   dark:text-white">Email</label>
      <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update user</button>
  </form>
  
  </div>
    )
  }
  

export default AdminHome;
