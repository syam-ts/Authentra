import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'


const OAuth = () => {
  
  const dispatch = useDispatch()

  const handleGoogle = async () => {

    try{
       
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          phote: result.user.photoURL
        })
      })
   const data = await res.json()
   console.log(data)
   dispatch(signInSuccess(data))
    } catch (err: any) {
      console.log('Could not login with Google', err)
    }
  }

  return (
     
     <button  type='button'
       onClick={handleGoogle}
     className="text-white p-3 uppecase">
      Continue with Google
     </button>
   
  )
}

export default OAuth