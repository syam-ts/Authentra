 

function AdminLogin() {
  return (
    <div>
 
<html>

<head>
    <link rel="stylesheet"
        href="https://horizon-ui.com/shadcn-nextjs-boilerplate/_next/static/css/32144b924e2aa5af.css" />
</head>

<body>
    <div className="flex flex-col justify-center items-center bg-white h-[100vh]">
        <div
            className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
            <a className="mt-10 w-fit text-zinc-950 dark:text-white" href="/">
     
            </a> 
            <div
                className=" border border-black p-16 w-full rounded-xl py-24 mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
                <p className="text-[32px] font-bold text-zinc-950 dark:text-white">Sign In</p>
            
          
                <div>
                    <form  className="mb-4 mt-5">
                        <div className="grid gap-2">
                            <div className="grid gap-1"><label className="text-zinc-950 dark:text-white"
                                     >Username</label>
                                     <input
                                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                    id="username" placeholder="username" type="username" 
                                    name="username" /><label
                                    className="text-zinc-950 mt-2 dark:text-white" >Password</label><input
                                    id="password" placeholder="Password" type="password"
                                     
                                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                    name="password" />
                                        </div><button
                                className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                                type="submit">Sign in</button>
                        </div>
                    </form>
          
                </div>
            </div> 
        </div>

        <p className="font-normal text-zinc-950 mt-20 mx-auto w-max">Auth Form from <a
                href="https://horizon-ui.com/shadcn-ui?ref=twcomponents" target="_blank"
                className="text-brand-500 font-bold">Horizon AI Boilerplate</a>
        </p>
    </div>
</body>

</html>
    </div>
  )
}

export default AdminLogin