import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import ProfileDD from '@/src/layouts/header/ProfileDD'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setcart] = useState({})
  const [subTotal, setsubTotal] = useState(0)
  let [serial, setserial] = useState(0)
  const [user, setuser] = useState({value: null})
  const [progress, setProgress] = useState(0)
  // const [key, setkey] = useState()
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart',()=> {
      setProgress(40);
    })
    router.events.on('routeChangeComplete',()=> {
      setProgress(100);
    })
    try {
      if(localStorage.getItem("cart" || "serial")){
        setcart(JSON.parse(localStorage.getItem("cart")));
        savecart(JSON.parse(localStorage.getItem("cart")));
        setserial(JSON.parse(localStorage.getItem("serial")));
        saveSerial(JSON.parse(localStorage.getItem("serial")));
      }
    } catch (error) {
      localStorage.clear();
    }
    const token = localStorage.getItem('token');
    if(token){
      setuser({value:token});
      // setkey(Math.random());
    }
  }, [])
  
  const logout = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('mail');
    // localStorage.removeItem('cart');
    // setkey(Math.random());
    setuser({value:null})
  }

  const saveSerial = (serial)=> {
    localStorage.setItem("serial",JSON.stringify(serial))
  }

  const savecart = (myCart)=> {
    localStorage.setItem("cart",JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length ; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setsubTotal(subt);
  }

  const addToCart = (itemCode,qty,price,name,size,variant,img)=> { 
    let newCart = JSON.parse(JSON.stringify(cart));
    setProgress(40);
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + 1;
      setProgress(100);
      toast.success(`${serial} Item added to the Cart`);
    }
    else{
      newCart[itemCode] = {qty: 1,price,name,size,variant,img};
      serial = serial + 1;
      setProgress(100);
      toast.success(`${serial} Item added to the Cart`);
    }
    setcart(newCart);
    savecart(newCart);
    setserial(serial);
    saveSerial(serial);
  }
  
  const buyNow = (itemCode,qty,price,name,size,variant,img) => {
    setProgress(40);
    let newCart = {}
    newCart[itemCode] = {qty: 1,price,name,size,variant,img};
    setcart(newCart);
    savecart(newCart);
    setserial(1);
    saveSerial(1);
    setProgress(100);
    router.push('/checkout')
  }
  
  const clearCart = ()=> {
    setProgress(40);
    toast.info("Your cart is Cleared");
    setProgress(100);
    setcart({});
    savecart({});
    setserial(0);
    saveSerial(0);
  }
  
  const removeFromCart = (itemCode,qty,price,name,size,variant)=> {
    setProgress(40);
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - 1;
      setProgress(100);
      // serial = serial - 1;
    }
    if(newCart[itemCode].qty <= 0){
      setProgress(100);
      delete newCart[itemCode];
      serial = 0;
    }
    setcart(newCart);
    savecart(newCart);
    setserial(serial);
    saveSerial(serial);
  }

  return(
  <>
  <LoadingBar
  color='#ff2d55'
  progress={progress}
  waitingTime={400}
  onLoaderFinished={()=> {setProgress(0)}}
  />
  <ToastContainer position='bottom-center' autoClose={1500} />
  <Navbar logout={logout} user={user} cart={cart} serial={serial} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  <Component setProgress={setProgress} logout={logout} cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer />
  </>
  ) 
}
