import React from 'react'

const Contact = () => {
  return (
    <div class="min-h-screen mx-auto dark:bg-gray-800 dark:text-gray-100">
      <div className="max-w-screen-xl px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto rounded-lg">
        <div className="flex justify-center items-center">
          <div>
            <h2 className="text-center text-3xl font-bold leading-tight">Lets talk about everything!</h2>
            <img className="h-40 mx-auto py-2 rounded-3xl" src="/BiggiMartcircle.png" alt="" />
            <p className="text-center text-xl lg:text-2xl font-medium leading-tight">Feel free to ask us anything!</p>
            <p className="py-4 px-4 text-md lg:text-md leading-tight text-center">If you have any questions regarding  your order, feel free to send email, call or Whatsapp us on our support number</p>
            <div className="sm:pl-4 pl-14 text-center sm:text-left mx-auto sm:flex lg:flex justify-between">
              <div className="md:w-2/3 text-left py-10 text-sm sm:pr-56">
                <span className="font-bold">Corporate Address</span>
                <br />
                Yaryan Ji
                <br />
                House no-56,
                <br />
                Village- Lakhnouti, Post- faloda, 
                <br />
                Block- Purkaji, City/Town- Muzaffarnagar,
                <br />
                State- Uttar Pradesh, Pincode - 251307
                <br />
              </div>

              <div className="md:w-1/3 text-left py-10 text-sm">
                <span className="font-bold">Customer Support</span>
                <br />
                Call/Whatsapp- 
                <a className="underline text-blue-600 dark:text-blue-400" rel="noreferrer" target="_blank" href="https://wa.me/7078073838?text=Hi,%20I%20need%20to%20enquire%20about%20products%20on%20BiggiMart">+91 8447891511</a>
                <br />
                Email- deepakyaryan898@gmail.com
                <br />
                 Morning- 10AM - 8PM (Mon - Fri)
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact