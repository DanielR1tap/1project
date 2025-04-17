import React from 'react'
import products from '@/data/product';
import Link from 'next/link';

const Products = () => {


  return (
    <div className="pt-[90px] pb-[250px] pr-[165px] pl-[165px] bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black pb-[15px]">Products</h2>
          <p className="text-black">
            Order it for you or for your beloved ones
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:gap-10 gap-5">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-gray-100 rounded-lg flex flex-col items-center w-[170px] mx-auto  shadow-sm  cursor-pointer hover:shadow-2xl transition-shadow  h-40">
                <div className=" flex items-center justify-center  w-full h-32 sm:h-40 ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />

                </div>
                <div className='bg-white w-[170px]  h-[70px] py-2 px-2  rounded-b-lg'><h3 className=" font-medium text-sm text-black mb-2 text-center">
                  {product.name.replace(" Candleaf®", "")}
                </h3>
                <p className="text-green-600 font-medium text-sm   text-center">{product.price}</p></div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products