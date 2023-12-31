import React,{ useState,useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Signup = ({setProgress}) => {
  let router = useRouter();
  const [merchantkey, setmerchantkey] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usertype, setUsertype] = useState('')

  useEffect(() => {
    setUsertype("Admin");
    if(localStorage.getItem('token')){
      router.push('/');
    }
  }, [])
console.log(process.env.merchantKey)
console.log("key:",merchantkey)
const handleSubmit = async (e) => {
  setProgress(40);
  e.preventDefault();
  if(merchantkey === process.env.NEXT_PUBLIC_MERCHANTKEY){
      const data = {merchantkey,name,email,password,usertype};
      
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      let response = await res.json();
      console.log(response);
      toast.success("Thanks! your account has been successfully created")
      setProgress(100);
      setmerchantkey('');
      setName('');
      setEmail('');
      setPassword('');
      router.push(`${process.env.NEXT_PUBLIC_HOST}/admin/login`);
  }
  else{
    setProgress(100);
    toast.success("You are not an Authorize Admin. Please use Correct credentials and Try again!")
  }
}

const handleChange = (e) => {
  e.preventDefault();
  if(e.target.name == "merchantkey"){
    setmerchantkey(e.target.value)
  }
  else if(e.target.name == "name"){
    setName(e.target.value)
  }
  else if(e.target.name == "email"){
    setEmail(e.target.value)
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Signup for Admin account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            {usertype && <div>
              <label htmlFor="merchantkey" className="block text-sm font-medium leading-6 text-gray-900">User Type <span className='text-red-600 font-bold'>*</span></label>
              <div className="mt-2">
                <input value={usertype} onChange={handleChange} id="merchantkey" name="merchantkey" type="merchantkey" autoComplete="current-merchantkey" placeholder='Enter merchantkey' required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" readOnly />
              </div>
            </div>}
            
            <div>
              <label htmlFor="merchantkey" className="block text-sm font-medium leading-6 text-gray-900">Merchant Key <span className='text-red-600 font-bold'>*</span></label>
              <div className="mt-2">
                <input value={merchantkey} onChange={handleChange} id="merchantkey" name="merchantkey" type="merchantkey" autoComplete="current-merchantkey" placeholder='Enter Merchant Key' required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name <span className='text-red-600 font-bold'>*</span></label>
              </div>
              <div className="mt-2">
                <input value={name} onChange={handleChange} id="name" name="name" type="name" autoComplete="current-name" placeholder='Enter your Name' required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address <span className='text-red-600 font-bold'>*</span></label>
              <div className="mt-2">
                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" placeholder='Enter your Email' required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password <span className='text-red-600 font-bold'>*</span></label>
              </div>
              <div className="mt-2">
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" placeholder='Enter a Strong Password' required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Signup</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Merchant !
            <Link href="/admin/login" legacyBehavior>
              <a href="#" className="ml-3 text-base font-semibold leading-6 text-pink-600 hover:text-pink-500">Admin Login</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup