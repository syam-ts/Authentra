import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error} = useSelector((state) => state.user)


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
       console.log('Middle')
      const data = await res.json()
      dispatch(signInSuccess(data)) 
      if(data.success === false) { 
       dispatch(signInFailure(data.message))
        return
      }
    navigate('/')
    }catch(err: any) {
      dispatch(signInFailure(err))
    }
   
 
  }

 

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign in
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        </form>
        <div className="flex gap-2 mt-5">
          <p> Dont have an account? </p>
         <Link to="/sign-up">
         <span className="text-blue-500 "> Sign Up </span>
         </Link>
        </div>
        <p className='text-red-700 mt-5'>
          { error && 'Something went wrong'}
        </p>
    </div>
  )
}

export default SignIn