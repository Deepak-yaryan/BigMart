import React, { useRef, useState,useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { useRouter } from 'next/router'

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, serial }) => {
  const [dropdown, setdropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false)
  const router = useRouter

  useEffect(() => {
    // Object.keys(cart).length !==0 && setSidebar(true);
    let exempted = ['/checkout','/order','/orders','/myaccount']
    if(exempted.includes(router.pathname)){
      setSidebar(false);
    }
  }, [])
  
  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full');
    //   ref.current.classList.add('translate-x-0');
    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0');
    //   ref.current.classList.add('translate-x-full');
    // }
  }
  const ref = useRef();

  return (
    <div className={`py-4 z-50 sticky top-0 bg-slate-50 flex flex-col md:flex-row md:justify-start justify-center items-center shadow-lg ${!sidebar && 'overflow-hidden'}`}>
      <div className="logo mx-5">
        <Link href="/">
          <img className='cursor-pointer' src="/logo.png" alt="logo image" width={200} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-medium md:text-md'>
          <li><Link href="/tshirts" legacyBehavior><a>Tshirts</a></Link></li>
          <li><Link href="/hoodies" legacyBehavior><a>Hoodies</a></Link></li>
          <li><Link href="/caps" legacyBehavior><a>Caps</a></Link></li>
          <li><Link href="/mugs" legacyBehavior><a>Mugs</a></Link></li>
          <li><Link href="/mousepads" legacyBehavior><a>MousePads</a></Link></li>
        </ul>
      </div>

      <div>
      <div className='cursor-pointer'>
          <div className="fixed cart right-9 top-5 mx-4" onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
            {dropdown && <div className='dropdown w-32 text-sm absolute right-2 top-6 rounded bg-pink-500 text-white'>
              <ul className='py-1 px-1'>
                <Link href="/myaccount" legacyBehavior><a><li className='py-1 px-2 rounded hover:bg-white hover:text-black'>My Account</li></a></Link>
                <Link href="/orders" legacyBehavior><a><li className='py-1 px-2 rounded hover:bg-white hover:text-black'>Orders</li></a></Link>
                <Link href="/" legacyBehavior><a><li onClick={logout} className='py-1 px-2 rounded hover:bg-white hover:text-black'>Logout</li></a></Link>
              </ul>
            </div>}
            {user.value && <div><MdAccountCircle className='text-3xl cursor-pointer hover:text-pink-700 text-pink-500' /></div>}
          </div>
        </div>

        {user.value && <div onClick={toggleCart} className="cart absolute right-1 top-5 mx-3">
          <AiOutlineShoppingCart className='text-3xl cursor-pointer hover:text-pink-700 text-pink-500' />
          {serial != 0 && <div className="text-center serial text-xs font-extrabold absolute -right-2 -top-3 -mx-1 border-2 w-6 h-6 rounded-full bg-red-600 text-white pt-0.5">{serial}</div>}
        </div>}
        {!user.value && <Link href="/login" legacyBehavior><a><button className='hover:bg-pink-400 hover:text-white hover:font-normal font-bold px-3 py-1 rounded-md cursor-pointer absolute right-0 top-6 mx-3'>Login</button></a></Link>}

      </div>


      {user.value && <div ref={ref} className={`w-80 max-h-80 overflow-auto sidecart absolute top-0  bg-pink-100 px-6 py-7 transition-all rounded-md ${sidebar ? 'right-0' : '-right-96'}`}>
        <h2 className='font-bold text-lg'>Shopping Cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-xl text-pink-500 hover:text-2xl'><AiFillCloseCircle /></span>
        <ul className='list-decimal font-semibold'>

          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your Cart is Empty!</div>}

          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className='item flex mt-4 mb-2 text-sm'>
                <div className='w-2/3 font-semibold '>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className='w-1/3 font-semibold flex items-center justify-center text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='w-1/3 cursor-pointer text-pink-500 hover:text-xl' /><span className='w-1/3 text-sm text-center'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='w-1/3 cursor-pointer text-pink-500 hover:text-xl' /></div>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Price Details</span>
                <span>₹{cart[k].price}.00</span>
              </div>
            </li>
          })}
          {!Object.keys(cart).length == 0 && <div><br />
            <hr />
            <div className='flex justify-between'>
              <span>Grand Total</span>
              <span>₹{subTotal}.00</span>
            </div> </div>}

        </ul>
        {!Object.keys(cart).length == 0 && <div className='flex mt-3'>
          <Link href="/checkout" legacyBehavior>
            <a>
              <button className='flex mr-2 text-white bg-pink-500  border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm'><BsFillBagCheckFill className='my-1 mx-1' />Checkout</button>
            </a>
          </Link>
          <button onClick={clearCart} className='flex mr-2 text-white bg-pink-500  border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm'>Clear Cart</button>
        </div>}
      </div>}
    </div>
  )
}

export default Navbar