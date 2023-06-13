import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { object } from 'prop-types'

const Orders = () => {
    const router = useRouter();
    const [orders, setorders] = useState([])

    useEffect(() => {
        const fetchorders = async () => {
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: localStorage.getItem('token') }),
            })
            let res = await a.json();
            setorders(res.orders);
            console.log(res);
        }
        if (!localStorage.getItem('token')) {
            router.push("/");
        }
        else {
            fetchorders();
        }
    }, [])

    return (
        <div className='xl:mx-52 xl:min-h-screen'>
            <div className='text-center mt-2 mb-3'>
                <h1 className='font-bold text-xl'>My Orders</h1>
            </div>

            {orders.map((item)=>{
            return <div key = {item._id} className="order xl:w-full py-4 px-0.5">
                <Link href={'/order?id=' + item._id} legacyBehavior>
                <a>
                <div className="flex justify-center items-center shadow-sm shadow-pink-500 py-6 rounded-lg space-x-1">
                    <div className="w-1/5 inline-flex items-center justify-center">
                        <img className='md:h-24 h-11 hover:scale-110 duration-200 rounded' src={item.products[`${Object.keys(item.products)}`]['img']} alt="Order Image" />
                    </div>
                    <div className='w-1/3 md:w-2/4 h-20 flex-col text-center'>
                    <span className="md:text-sm text-xs text-gray-900 font-medium title-font text-center">Order id / Date</span>
                    <br />
                    <hr />
                    <span className="md:text-sm text-xs text-gray-900 title-font text-center">{item.orderId}<br/>{(item.createdAt).slice(0,10)}</span>
                    </div>
                    <div className='w-1/4 md:w-1/4 h-20 flex-col text-center justify-center'>
                    <span className="md:text-sm text-xs leading-relaxed font-medium text-center">Price</span>
                    <br />
                    <hr />
                    <span className="md:text-xs text-xs leading-relaxed text-center">Rs {item.amount}.00</span>
                    </div>
                    <div className='w-3/5 md:w-1/4 h-20 flex-col text-center justify-start'>
                    <span className="md:text-sm text-xs leading-relaxed font-medium text-center">Status</span>
                    <br />
                    <hr />
                    <span className="md:text-xs text-xs leading-relaxed text-center">{item.status}<br/>Order Placed</span>
                    </div>
                </div>
                </a>
                </Link>
            </div>
            })}

        </div>
    )
}

export default Orders