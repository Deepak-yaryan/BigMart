import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Forgot = ({setProgress}) => {
  let router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleChange = async (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    else if (e.target.name == "cpassword") {
      setCpassword(e.target.value)
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [])

  const sendResetEmail = async (e) => {
    setProgress(40);
    e.preventDefault();
    let data = { email, sendMail: true };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    console.log(res)
    if (res.success) {
      toast.success("Password reset Instructions has been sent to your Email");
      setTimeout(() => {
        setProgress(100);
        router.push('https://gmail.com');
      }, 1500);
    }
    else {
      setProgress(100);
      toast.error("Some error occured while generating the reset Password Email. Please try again after Some time");
    }
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password == cpassword) {
      let token = router.query.token;
      let email = router.query.email;
      let data = { password, sendMail: false, token, email };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      let res = await a.json()
      console.log("res :",res)
      if (res.success) {
        toast.success("Password has been Changed Successfully");
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
      else {
        toast.error("Due to some technical problem your password cannot be chnaged. Please try again after Some time");
      }
    }
    else {
      toast.error("Password and Confirm password are not the same Please try again");
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-start px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src="/codeswearcircle.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
        </div>
        <p className="text-center text-sm text-gray-500">
          Or
          <Link href="/login" legacyBehavior>
            <a href="#" className="ml-2 text-base font-semibold leading-6 text-pink-600 hover:text-pink-500">Login</a>
          </Link>
        </p>

        {router.query.token && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input value={password} onChange={handleChange} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <div className="mt-2">
                <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button disabled={password !== cpassword} onClick={resetPassword} type="submit" className="disabled:bg-pink-300 flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
            </div>

            {password !== cpassword &&
              <span className='text-red-600'>Password Doesn't Match.</span>}
            {password && password === cpassword &&
              <span className='text-green-600'>Password Match.</span>}
          </form>


        </div>}
        {!router.query.token && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button value={email} onClick={sendResetEmail} type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
            </div>
          </form>


        </div>}
      </div>
    </>
  )
}

export default Forgot