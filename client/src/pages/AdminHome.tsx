import { useEffect, useRef, useState } from "react";
import Header from "../component/Header";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux' 
import { Link, useNavigate } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase' 

import { 
    updateUserStart,
     updateUserSuccess,
      updateUserFailure ,
    deleteUserStart,
     deleteUserSuccess,
      deleteUserFailure  
    
    } from '../redux/user/userSlice.js'

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

  useEffect(() => {
    axios
      .get("/api/user/admin/users")
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])


  // const handleEditUser = async (id: any) => {
  //   console.log(id)
  
  //   const res = await fetch(`/api/user/admin/admin-edit/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  
  //   if (!res.ok) {
  //     console.error('Error:', res.status, res.statusText)
  //     throw new Error(`Error fetching user: ${res.status} ${res.statusText}`)
  //   }
  
  //   const data = await res.json()
  //   console.log(data)
  //   navigate(`/admin/edit/${data._id}`)
  // }

  const history = useNavigate ()

  const handleEditUser = (userId: string) => {
    history(`/admin/edit-user/${userId}`)
  };
  

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
             
         
           
                 <button className='h-1 w-5'
                    onClick={() => handleEditUser(user._id)}
                 >
                    <img src="https://img.icons8.com/?size=80&id=88sXsrqGPpa0&format=png" />
                  </button>
                 
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

    interface FormData {
        username?: string;
        email?: string;
        password?: string;
        profilePicture?: string;
      }
      
    
       const { user , loading, error} = useSelector((state: any ) => state.user)
       const fileRef: any = useRef(null)
       const [ image, setImage] = useState(undefined)
       const [imagePercent, setImagePercent] = useState(0)
       const [imageError, setImageError] = useState(false)
       const [formData, setFormData] = useState<FormData>({})
       const [updateSuccess, setUpdateSuccess] = useState(false)
       const dispatch = useDispatch()
       


    
   useEffect(() => {
    if(image) {
      handleFileUpload(image)
    }
   }, [image])

   const handleFileUpload = async (image: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error: any) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  } 


  const handleSubmit = async (e: any) => {  
  console.log(user.currentUser._id)
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${user.currentUser._id}`, {
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
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile</h1>
      <form className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <input type='file' ref={fileRef} hidden accept='/image/*' 
         onChange={(e: any) => setImage(e.target.files[0])}

        />
        <img src={formData.profilePicture || user.currentUser.profilePicture} alt='profile' 
         className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
         onClick={() => fileRef.current.click()}
        />
     
     <p className='text-sm self-center'>
      {imageError ? 
        (<span className='text-red-700'>  Error Uploading image
        ( file size must be less than 2 MB)
        </span> ): imagePercent > 0 && 
      imagePercent < 100 ?
      (<span className='text-slate-700'>
          { `Uploading: ${imagePercent} %`}   
        </span>) : 
        imagePercent === 100 ?
       ( <span className='text-green-700'>
        Image uploaded successfully  
      </span>) : '' 
      } 
     </p>
        <input defaultValue={user.currentUser.username} type='text' id='username'  
          placeholder='username' className='bg-slate-100 rounded-lg p-3'
           onChange={handleChange}
        />
        <input defaultValue={user.currentUser.email} type='email' id='email'  
          placeholder='email' className='bg-slate-100 rounded-lg p-3'
           onChange={handleChange}
        />
        <input type='password' id='password'  
          placeholder='password' className='bg-slate-100 rounded-lg p-3'
           onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          { loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <p className='text-red-700 mt-5'> { error && 'Something went wrong'} </p>
      <p className='text-green-700 mt-5'> { updateSuccess && ' User is updated successfully!'} </p>
    </div>
  )
    }
    
    
    export default AdminHome