import React from 'react'

const About = () => {
  return (
    <div class="min-h-screen mx-auto dark:bg-gray-800 dark:text-gray-100">
      <section class="body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img class="w-24 md:w-36 mb-10 object-cover object-center rounded" alt="hero" src="/codeswearcircle.png" />
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-2 font-medium">Welcome to <span>Codeswear.com</span></h1>
            <p class="text-xl leading-relaxed mb-2">Buy <span class="text-pink-700 dark:text-pink-600 font-semibold">Sweatshirts</span><span class="typed-cursor typed-cursor--blink" aria-hidden="true">|</span></p>
            <p class="mb-8 leading-relaxed">Introducing CodesWear, a revolutionary e-commerce platform that delivers amazing products at unbeatable prices. Built on a foundation of NextJs and MongoDB, our website offers a seamless shopping experience powered by server-side rendering. Whether you're a tech enthusiast or simply looking for a stylish geek T-shirt, CodesWear has something for everyone. And for those curious about the development process, be sure to check out the CodeWithHarry NextJs playlist on YouTube. Shop now at CodesWear and experience the future of online shopping.</p>
            <div class="flex justify-center">
              <a href="/tshirts"><button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Start Shopping</button></a>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section class="flex mt-8 body-font mx-8 px-8">
        <div class="flex flex-col md:w-2/3">
          <h1 class="font-semibold my-2 text-3xl">About Codeswear</h1>
          <p class="mb-2 leading-relaxed">Codeswear.com is revolutionizing the way India shops for unique, geeky apparel. From our one-of-a-kind hoodie designs to our wide selection of stickers, mugs and other accessories, we have everything you need to express your individuality and stand out from the crowd. Say goodbye to the hassle of hopping from store to store in search of your perfect geeky look. With just a single click on our website, you can find it all!</p>
          <p class="mb-2 leading-relaxed">But what sets Codeswear apart from the competition? The answer is simple: our unique designs and commitment to providing the highest quality products. We understand the importance of style and durability, which is why we put so much effort into creating unique designs and using only the best materials. Don't settle for mediocre clothing and accessories - choose Codeswear and make a statement with your wardrobe.</p>
          <p class="mb-2 leading-relaxed">At Codeswear, we strive to be more than just an online store - we want to be a community where like-minded individuals can come together and express themselves through fashion. Whether you're a gamer, a programmer, or simply someone who loves all things geeky, we have something for you. Our collection is curated with the latest trends and fan favorites in mind, ensuring that you'll always find something new and exciting.</p>
          <p class="mb-2 leading-relaxed">We also understand the importance of affordability and convenience. That's why we offer competitive prices and fast shipping, so you can get your hands on your new geeky apparel as soon as possible. Plus, with our easy-to-use website and secure checkout process, shopping with us is a breeze.</p>
          <p class="mb-6 leading-relaxed">So why wait? Visit Codeswear.com today and discover the latest in geeky fashion. With our unique designs and high-quality products, we're sure you'll find something you'll love. Join our community and express your individuality through fashion.</p>
        </div>
        <div class="hidden md:flex w-1/3 mx-1">
          <img src="/0.jpeg" class="object-contain rounded-md " />
        </div>
      </section>
      <section class="body-font">
        <div class="container px-5 py-24 mx-auto">
          <h1 class="text-3xl font-medium title-font mb-12 text-center">Testimonials</h1>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/2 w-full"><div class="h-full bg-gray-100 dark:bg-gray-700 p-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036"><path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path></svg>
              <p class="leading-relaxed mb-6">I recently discovered this site and I am so impressed with the quality and selection of hoodies and sweatshirts they offer. Not only are the prices incredibly affordable, but the quality of the clothing is top-notch. I have received many compliments on the items I've purchased and have been asked where I got them. The customer service is also excellent - they were very helpful with a question I had. I highly recommend this site to anyone looking for high-quality clothing at unbeatable prices.</p>
              <a class="inline-flex items-center">
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font font-medium">Aakash Sharma</span>
                  <span class="text-gray-500 dark:text-gray-400 text-sm">CUSTOMER</span>
                </span>
              </a>
            </div>
            </div>
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full bg-gray-100 dark:bg-gray-700 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036"><path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path></svg>
                <p class="leading-relaxed mb-6">I recently purchased a hoodie and t-shirt from this online ecommerce site and I couldn't be happier with my purchase! The quality of the clothing is top-notch and the designs are unique and stylish. The ordering process was easy and the shipping was fast. I also appreciate the wide variety of sizes available. I highly recommend this site to anyone looking for high-quality, fashionable clothing at a great price.</p>
                <a class="inline-flex items-center">
                  <span class="flex-grow flex flex-col pl-4">
                    <span class="title-font font-medium">Sonu Kumar</span>
                    <span class="text-gray-500 dark:text-gray-400 text-sm">CUSTOMER</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About