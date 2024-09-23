import {useSelector} from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

function Profile() {
   const { user } = useSelector((state: any ) => state.user)
   const fileRef: any = useRef(null)
   const [ image, setImage] = useState(undefined)
   const [imagePercent, setImagePercent] = useState(0)
   const [imageError, setImageError] = useState(false)
   const [formData, setFormData] = useState({})
   console.log( formData )
 
 
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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='/image/*' 
         onChange={(e: any) => setImage(e.target.files[0])}
        />
        <img src={user.currentUser.profilePicture} alt='profile' 
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
        />
        <input defaultValue={user.currentUser.email} type='email' id='email'  
          placeholder='email' className='bg-slate-100 rounded-lg p-3'
        />
        <input type='password' id='password'  
          placeholder='password' className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile