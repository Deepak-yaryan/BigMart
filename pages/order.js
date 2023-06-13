import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose';
import Order from '@/models/Order';
import { useRouter } from 'next/router';
import { comma } from 'postcss/lib/list';

const MyOrder = ({ order, clearCart }) => {
  const products = order.products;
  const router = useRouter();
  const [date, setDate] = useState()
  useEffect(() => {
    const d = new Date(order.createdAt)
    setDate(d)
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, [])
  // const obj = products;
  const name = Object.keys(products)[0];
  const imag = products[`${name}`]['img']
  console.log(imag);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-8 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
              <h1 className="text-green-500 text-xl md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
              <p className="leading-relaxed mb-4 text-green-400">Your item has been succesfully placed.</p>
              <p className="leading-relaxed mb-4 text-sm">Order placed on: {date && date.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="leading-relaxed mb-4">Order Status: <span className='text-green-500 font-medium'>{order.status}</span>.</p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Description</a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-center">Quantity</a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-right">Item Total</a>
              </div>


              {Object.keys(products).map((key) => {
                return <div key={key} className="flex border-gray-200 py-2">
                  <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
                  <span className="ml-auto text-gray-900">{products[key].qty}</span>
                  <span className="ml-auto text-gray-900">₹{products[key].price}.00 X {products[key].qty} = ₹{products[key].price * products[key].qty}.00</span>
                </div>
              })}


              <div className="">
                <div className="mt-8 mb-6 title-font font-medium text-xl md:text-2xl text-gray-900">SubTotal: ₹{order.amount}.00</div>
                <button className="text-white bg-pink-500 border-0 mt-2 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
              </div>
            </div>
            <img className='md:w-1/3 w-96 md:h-1/3 h-96 text-center m-auto rounded lg:hover:scale-110 duration-200' src={imag} alt="Tshirt Image" />
            {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={imag} /> */}
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MongoURI)
  }
  let order = await Order.findById(context.query.id);
  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  }
}

export default MyOrder