import React, { useRef, useEffect, useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
import { toast } from 'react-toastify';

const Checkout = ({ setProgress ,cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_HOST;
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [alternatephone, setAlternatephone] = useState("")
  const [pincode, setPincode] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const router = useRouter();
  useEffect(() => {
    let user = localStorage.getItem("mail")
    if(localStorage.getItem('mail'))
    {
      setEmail(user)
    }
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
    fetchData();
  }, [])
  
  useEffect(() => {
    if (name.length >= 3 && email.length >= 3 && address.length >= 3 && phone.length >= 10 && alternatephone.length >= 10 && pincode.length >= 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [ name, email, phone, alternatephone, address, pincode ])
  

  const fetchData = async () => {
    let a = await fetch(`${BASE_URL}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    })
    let res = await a.json();
    setUsername(res.username);
    setName(res.name);
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
    getPinCode(res.pincode);
  }

  const getPinCode = async(pin)=> {
    let pins = await fetch(`${BASE_URL}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(pin)) {
          setState(pinJson[pin][1]);
          setCity(pinJson[pin][0]);
        }
        else {
          setState("");
          setCity("");
        }
  }


  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name == "address") {
      setAddress(e.target.value);
    }
    else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    else if (e.target.name == "alternatephone") {
      setAlternatephone(e.target.value);
    }
    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getPinCode(e.target.value);
      }
      else {
        setState("");
        setCity("");
      }
    }
  }


  const initiatePayment = async () => {
    let oid = JSON.stringify(Math.floor(Math.random() * Date.now()));
    const data = { cart, subTotal, email, oid, name, username, address, pincode, phone, state, city };
    // Get a paymentSession ID
    let a = await fetch(`${BASE_URL}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const paymentResponse = await a.json();
    if(paymentResponse.success){
      let paymentSessionId = paymentResponse.payment_session_id;
  
      if (paymentSessionId == "") {
        alert("No Session_Id Specified");
        return;
      }
  
      const cashfree = new Cashfree(paymentSessionId);
      cashfree.redirect();
    }
    else{
      console.log(paymentResponse.error);
      if(paymentResponse.cartClear){
        clearCart();
      }
      toast.error(paymentResponse.error);
    }
  }

  return (
    <div className='container m-auto'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type='text/javascript' src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"></Script>
      <div className='font-bold text-3xl my-8 text-center'>Chekout</div>
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
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email <span className='text-red-600 font-bold'>*</span></label>
                  <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly/>
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
                  <label htmlFor="alternatephone" className="leading-7 text-sm text-gray-600">Alternate Phone<span className='text-red-600 font-bold'>*</span></label>
                  <input onChange={handleChange} value={alternatephone} type="text" id="alternatephone" name="alternatephone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode <span className='text-red-600 font-bold'>*</span></label>
                  <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 pl-3 -pr-10 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="city" className="leading-7 text-sm text-gray-600">District <span className='text-red-600 font-bold'>*</span></label>
                  <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">State <span className='text-red-600 font-bold'>*</span></label>
                  <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                </div>
              </div>
            </div>


            <h2 className='mt-8 mb-2 font-semibold'>2. Review cart Item & Pay</h2>
            <div className="sidecart py-8">
              <h2 className='font-bold text-xl'>Shopping Cart</h2>
              <ul className='list-decimal font-semibold mx-5'>

                {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your Cart is Empty!</div>}

                {Object.keys(cart).map((k) => {
                  return <li>
                    <div className='item flex my-5'>
                      <div className='w-2/3 font-semibold '>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                      <div className='w-1/3 font-semibold flex items-center justify-center text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='w-1/3 cursor-pointer text-pink-500 hover:text-xl' /><span className='w-1/3 text-sm text-center'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='w-1/3 cursor-pointer text-pink-500 hover:text-xl' /></div>
                    </div>
                    <div className='flex justify-between mr-10'>
                      <span>Price Details</span>
                      <span>₹{cart[k].price}.00</span>
                    </div>
                    <br />
                    <hr />
                    <div className='flex justify-between mr-10'>
                      <span>Total Amount</span>
                      <span>₹{subTotal}.00</span>
                    </div>
                  </li>
                })}

              </ul>
              {/* <Link className='flex' legacyBehavior> */}
              <a className='flex'>
                <button disabled={disabled} onClick={initiatePayment} className='disabled:bg-pink-300 flex mt-4 mr-2 text-white bg-pink-500  border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm'><BsFillBagCheckFill className='my-1 mx-1' />Pay Now</button>
              </a>
              {/* </Link> */}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Checkout