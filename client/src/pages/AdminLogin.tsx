import { useState } from "react";

const AdminLogin = () => {

    interface FormData {
        username?: string; 
        password?: string; 
      }

  const [formData, setFormData] = useState<FormData>({}) 

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  } 

  const subminForm = async (e: any) => {
    e.preventDefault();
    try { 
      const res = await fetch(`api/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      console.log('form data : ', formData)
      console.log('data',res)
      const data = await res.json();
       
    } catch (error) {
      
      console.log('error')
    }
  }

  return (
    <div>
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://horizon-ui.com/shadcn-nextjs-boilerplate/_next/static/css/32144b924e2aa5af.css"
          />
        </head>

        <body>
          <div className="flex flex-col justify-center items-center bg-white h-[100vh]">
            <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
              <a
                className="mt-10 w-fit text-zinc-950 dark:text-white"
                href="/"
              ></a>
              <div className=" border border-black p-16 w-full rounded-xl py-24 mb-auto mt-8 flex flex-col md:mt-[70px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
                <p className="text-[32px] font-bold text-zinc-950 dark:text-white">
                  Sign In
                </p>

                <div>
                  <form className="mb-4 mt-5"
                   onSubmit={subminForm}
                  >
                    <div className="grid gap-2">
                      <div className="grid gap-1">
                        <label className="text-zinc-950 dark:text-white">
                          Username
                        </label>
                        <input
                          className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                          id="username"
                          type="text"
                          placeholder="username"
                          onChange={handleChange}
                        />
                        <label className="text-zinc-950 mt-2 dark:text-white">
                          Password
                        </label>
                        <input
                          id="password"
                          placeholder="Password"
                          type="password"
                          className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </div>
  );
};

export default AdminLogin;
