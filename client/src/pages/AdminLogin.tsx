import { useState } from "react"


const Alogin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = (event: any) => {
        event.preventDefault(); 
        fetch('http://localhost:3005/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              window.location.href = data.redirect
            } else {
              alert('invalid credentials')
              window.location.href = data.redirect
            }
          })
          .catch((error) => console.error(error))
      }; 

  return (
    <section className="bg-gray-50  ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 :text-white">
         
      </a>
      <div className="w-full bg-gray-200 rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight hover:text-blue-600 text-gray-900 md:text-2xl text-center">
                  Admin Login
              </h1>
              <form className="space-y-4 md:space-y-6" 
                onSubmit={handleSubmit}
              >
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">Usename</label>
                      <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Username" 
                        value={username}
                         onChange={(event) => setUsername(event.target.value)}
                      />
                  </div>
                  <div>
                      <label   className="block mb-2 text-sm font-medium text-gray-900 :text-white">Password</label>
                      <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" 
                         placeholder='Enter password'
                        value={password}
                         onChange={(event) => setPassword(event.target.value)}
                      />
                  </div>
                  <div className="flex items-center justify-between">
               <div className='grid'>
               <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="" className="w-4 h-4 border border-gray-300 rounded bg-gray-200 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800" />
                          </div>
                        
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="" className="w-4 h-4 border border-gray-300 rounded bg-gray-200 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :border-gray-600 :focus:ring-primary-600 :ring-offset-gray-800" />
                          </div>
                        
                      </div>
               </div>
                  </div>
                  <button type="submit" className="w-full bg-sky-500 hover:opacity-70 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800"
                     value='Login'
                  >
                    Login
                    </button>
               
              </form>
          </div>
      </div>
  </div>
</section>
  )
}


export default Alogin