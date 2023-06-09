import React from 'react'
import Link from 'next/link'
import Product from '@/models/Product';
import mongoose from 'mongoose';

const Caps = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className=" px-5 py-10 mx-auto">
          <div className="flex flex-wrap justify-center">

            {Object.keys(products).length === 0 && <p className='text-xl font-bold'>Sorry All Caps are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
              return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`} legacyBehavior>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full  cursor-pointer shadow-lg  mx-9 my-5">
                  <a className="flex justify-center">
                    <img alt="ecommerce" className="h-[28vh] block" src={products[item].img} />
                  </a>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}.00 INR</p>
                    <div className="mt-1">
                      {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('Purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('Yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('White') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1 rounded-md '>S</span>}
                      {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1 rounded-md '>M</span>}
                      {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1 rounded-md '>L</span>}
                      {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1 rounded-md '>XL</span>}
                      {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1 rounded-md '>XXL</span>}
                    </div>
                  </div>
                </div>
              </Link>
            })}

          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.mongoURI)
    console.log("Connected to Mongo Succesfully");
  }
  let products = await Product.find({ category: "caps" });
  let caps = {}
  for (let item of products) {
    if (item.title in caps) {
      if (!caps[item.title].color.includes(item.color) && item.availaibleQty > 0) {
        caps[item.title].color.push(item.color);
      }
      if (!caps[item.title].size.includes(item.size) && item.availaibleQty > 0) {
        caps[item.title].size.push(item.size);
      }
    }
    else {
      caps[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availaibleQty > 0) {
        caps[item.title].color = [item.color];
        caps[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(caps)) }
  }
}

export default Caps