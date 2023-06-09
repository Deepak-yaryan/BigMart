import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

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
            return <div key = {item._id} className="order xl:w-full md:w-1/2 p-4">
                <Link href={'/order?id=' + item._id} legacyBehavior>
                <a>
                <div className="flex items-center shadow-sm shadow-pink-500 py-1 rounded-lg">
                    <div className="w-1/4 inline-flex items-center justify-center">
                        <img className='h-20' src="/0.jpeg" alt="Order Image" />
                    </div>
                    <div className='w-2/4 flex-col text-center'>
                    <span className="text-sm text-gray-900 font-medium title-font text-center">Order id / Date</span>
                    <br />
                    <hr />
                    <span className="text-sm text-gray-900 title-font text-center">{item.orderId} / {(item.createdAt).slice(0,10)}</span>
                    </div>
                    <div className='w-1/4 flex-col text-center'>
                    <span className="text-sm leading-relaxed font-medium text-center">Price</span>
                    <br />
                    <hr />
                    <span className="text-xs leading-relaxed text-center">Rs {item.amount}.00</span>
                    </div>
                    <div className='w-1/4 flex-col text-center'>
                    <span className="text-sm leading-relaxed font-medium text-center">Payment / Order Status</span>
                    <br />
                    <hr />
                    <span className="text-xs leading-relaxed text-center">{item.status} / Order Placed</span>
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