import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../component/OAuth'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser, loading, error} = useSelector((state: any) => state.user.user)

  useEffect(() => {
 
    if(currentUser != null ) {

      navigate('/')
    }

  },[ ])


  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();




    try{
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
 
  
      if(data.success === false) { 
       dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data)) 
    navigate('/')
    }catch(err: any) {
      dispatch(signInFailure(err))
    }
   
 
  }

 

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7">
        Sign in
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center ">
          <input type="email" 
          placeholder="email"
          id="email" className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          />
          <input type="password" 
          placeholder="password"
          id="password" className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          />
          <button disabled={loading} 
          className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
            { loading ? 'loading' : 'signin'}
            </button>
            <div className="bg-red-700 rounded-lg hover:opacity-95">
            <OAuth />
            </div>
        </form>
        <div className="flex gap-2 mt-5">
          <p> Dont have an account? </p>
         <Link to="/signup">
         <span className="text-blue-500 "> Sign Up </span>
         </Link>
        </div>
        <p className='text-red-700 mt-5'>
          { error ? error.message || 'Something went wrong' : ''}
        </p>
    </div>
  )
}

export default SignIn