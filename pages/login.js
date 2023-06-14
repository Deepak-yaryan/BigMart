import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { toast } from "react-toastify"
import { useRouter } from 'next/router'

const Login = ({setProgress}) => {
  const Base_Url = process.env.NEXT_PUBLIC_HOST;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let router = useRouter();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/');
    }
  }, [])
  

  const handleSubmit = async (e) => {
    setProgress(40);
    e.preventDefault();
    const data = {email,password};
    
    let res = await fetch(`${Base_Url}/api/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    let response = await res.json();

    if(response.Success){
      localStorage.setItem('token', response.token);
      toast.success("Loggedin Successfully");
      setTimeout(() => {
        // router.push(`${process.env.NEXT_PUBLIC_HOST}`);
        setProgress(100);
        window.location = `${Base_Url}`;
      }, 1000);
    }
    else{
      toast.error(response.error);
      setProgress(100);
      setEmail('');
      setPassword('');
    }
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.name == "email"){
      setEmail(e.target.value)
      localStorage.setItem("mail",e.target.value);
    }
    else if(e.target.name == "password"){
      setPassword(e.target.value)
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-start px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto rounded" src="/BiggiMartcircle.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address <span className='text-red-600 font-bold'>*</span></label>
              <div className="mt-2">
                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password <span className='text-red-600 font-bold'>*</span></label>
                <Link href="/forgot" legacyBehavior>
                    <a href="#" className="text-sm font-semibold text-pink-600 hover:text-pink-500">Forgot password?</a>
                </Link>
              </div>
              <div className="mt-2">
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href="/signup" legacyBehavior>
              <a href="#" className="ml-3 text-base font-semibold leading-6 text-pink-600 hover:text-pink-500">Signup</a>
            </Link>
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            if you are a Merchant?
            <Link href="/admin/login" legacyBehavior>
              <a href="#" className="ml-3 text-base font-semibold leading-6 text-white hover:text-black hover:bg-white bg-black p-1 rounded-md">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login