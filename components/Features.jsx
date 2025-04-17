import React from 'react'


const Features = () => {
    const  benefits = [
        "Eco-sustainable: All recyclable materials, 0% CO2 emissions",
    "Hypoallergenic: 100% natural, human friendly ingredients",
    "Handmade: All candles are crafty made with love.",
    "Long burning: No more waste. Created for last long.",
    ]
    return (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">

              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold text-black mb-4">
                  Clean and fragrant soy wax
                </h2>
                <p className="text-lg text-green-500 mb-6">
                  Made for your home and for your wellness
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-black mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-black">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-[68px] mr-[165px] bg-green-400 text-white px-6 py-2 rounded-full hover:bg-green-500 transition">
                  Learn more
                </button>
              </div>


              <div className="lg:w-1/2 flex justify-center">
                <img
                  className="w-full h-full object-cover"
                  src="/image/mockups.png"
                  alt="Clean and fragrant soy wax"
                />
              </div>
            </div>
          </div>
        </div>
      );
}

export default Features