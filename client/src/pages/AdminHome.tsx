import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure 
} from "../redux/user/userSlice.js";

function AdminHome() {
  interface Users {
    _id: string;
    profilePicture: string;
    username: string;
    email: string;
    createdAt: string;
  }

  const [users, setUsers] = useState<Users[]>([])
  const navigate = useNavigate();
  const { error } = useSelector((state: any) => state.user.user) 
  const dispatch = useDispatch()
 
  console.log("admin : ", error);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/user/admin/users")
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])
  

  const history = useNavigate();

  const handleEditUser = (userId: string) => {
    history(`/admin/edit-user/${userId}`);
  };

  const handleDeleteAccount = async (userId: any) => {
    console.log("user id : ", userId);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3005/api/user/delete/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/admin", { replace: true });
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

 
  return (
    <div>
      <span className="pb-12 m-12">.</span>

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
          <tbody className="h-[200px]">
            {users.map((user) => (
              <tr className="border-b border-black" key={user._id}>
                <td className="px-6 py-4 w-1">
                  <img src={user.profilePicture} />
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-5">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "numeric",
                      year: "numeric",
                    })}

                    <button
                      className="h-1 w-5"
                      onClick={() => handleEditUser(user._id)}
                    >
                      <img src="https://img.icons8.com/?size=80&id=88sXsrqGPpa0&format=png" />
                    </button>

                    <button
                      className="h-1 w-5"
                      onClick={() => handleDeleteAccount(user._id)}
                    >
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
  )
 } 

export default AdminHome;
