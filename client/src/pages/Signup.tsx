import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../component/OAuth'


const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault(); 

    try{
      setLoading(true)
      setError(false) 
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
       console.log('Middle')
      const data = await res.json()
      setLoading(false)
      console.log('The data : ',data)
      if(data.success === false) {
        console.log('Error has gotten!')
        setError(true)
        return
        }
        navigate('/sign-in')

    }catch(err: any) {

      setLoading(false)
      setError(true)
    }
   
 
  }

 

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" 
          placeholder="username"
          id="username" className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          />
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
            { loading ? 'loading' : 'signup'}
            </button>
            <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p> Have an account? </p>
         <Link to="/sign-in">
         <span className="text-blue-500 "> Sign In </span>
         </Link>
        </div>
        <p className='text-red-700 mt-5'>
          { error && 'Something went wrong'}
        </p>
    </div>
  )
}

export default SignUp