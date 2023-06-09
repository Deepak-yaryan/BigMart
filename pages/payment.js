import React,{useEffect} from 'react'
import { useRouter } from 'next/router';

const Payment = () => {
  const router = useRouter();
    useEffect(() => {
      if(!localStorage.getItem('token')){
        router.push('/')
      }
    }, [])
  return (
  <>
    <h1 className='text-center font-semibold'>Make your Payment</h1>
  </>
  )
}

export default Payment