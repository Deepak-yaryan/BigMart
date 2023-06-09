import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const MyAccount = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [pincode, setPincode] = useState("")
  const [password, setPassword] = useState("")
  const [npassword, setNpassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const router = useRouter();
  useEffect(() => {
    let user = localStorage.getItem("mail")
    if (localStorage.getItem('mail')) {
      setEmail(user)
    }
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    })
    let res = await a.json();
    setName(res.name);
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
  }

  const handleUserSubmit = async () => {
    let data = { token: localStorage.getItem('token'), name, address, phone, pincode }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json();
    toast.success("Successfully Updated");
  }

  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: localStorage.getItem('token'), password, npassword, cpassword }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      res = await a.json();
    }
    else {
      res = { success: false };
    }
    console.log(res)
    if (res.success) {
      toast.success("Successfully Updated");
    }
    else {
      toast.error("Error Updating Password");
    }
    setPassword("");
    setCpassword("");
    setNpassword("");
  }

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    else if (e.target.name == "address") {
      setAddress(e.target.value);
    }
    else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
    else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
  }

  return (
    <>
      <div className='container mx-auto my-9'>
        <h1 className='text-xl text-center font-bold'>Update Your Account</h1>
        <section className="text-gray-600 body-font relative">
          <div className=" px-5 py-4">
            <div className="lg:w-1/2 md:w-2/3 mx-auto">


              <h2 className='mb-2 font-semibold'>1. Delivery Details</h2>
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name <span className='text-red-600 font-bold'>*</span></label>
                    <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email <span className='text-red-600 font-bold'>*</span> (cannot be updated)</label>
                    <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address <span className='text-red-600 font-bold'>*</span></label>
                    <textarea onChange={handleChange} value={address} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone <span className='text-red-600 font-bold'>*</span></label>
                    <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode <span className='text-red-600 font-bold'>*</span></label>
                    <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 pl-3 -pr-10 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <a className='flex'>
                  <button onChange={handleChange} onClick={handleUserSubmit} className='disabled:bg-pink-300 flex mt-4 mr-2 text-white bg-pink-500  border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm'>Update</button>
                </a>
              </div>

              <h2 className='mb-2 mt-6 font-semibold'>2. Change Password</h2>
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Old Password <span className='text-red-600 font-bold'>*</span></label>
                    <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password <span className='text-red-600 font-bold'>*</span></label>
                    <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password <span className='text-red-600 font-bold'>*</span></label>
                    <input onChange={handleChange} value={cpassword} type="text" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <a className='flex'>
                  <button onChange={handleChange} onClick={handlePasswordSubmit} className='disabled:bg-pink-300 flex mt-4 mr-2 text-white bg-pink-500  border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm'>Update</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default MyAccount