import React from 'react'

const Hero = () => {
  return (
    <div className="flex justify-center items-center ">
    <div className="relative  w-screen h-screen max-w-full max-h-[780px] ">
      <img
        src="/image/bg-image.png"
        alt="Candles and leaves"
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-12  rounded-[2px] shadow-lg  text-center max-w-md text-black  ">

          <h1 className="text-3xl font-bold  mb-4">
            The nature candle
          </h1>
          <p className="mb-6">
            All handmade with natural soy wax, Candleaf is a companion for all
            your pleasure moments
          </p>
          <button className="text-white px-6 py-2 rounded-2xl bg-green-600 transition">
            Discovery our collection
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero