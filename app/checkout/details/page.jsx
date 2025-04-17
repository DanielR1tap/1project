"use client";



import React, { useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CheckoutDetails = () => {

  const { user } = useAuth();
  const { checkoutData, updateCheckoutData } = useCheckout();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      router.push('/Register');
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/checkout/shipping');
  };



  return (
    <div className=" mx-auto p-6 flex  md:flex-row gap-6 ">

      <div className="md:w-2/3 min-h-screen">

        <div className="flex space-x-4 mb-6">
          <Link href="/cart" className="font-semibold text-green-500">Cart</Link>
          <span>&gt;</span>
          <span className="font-semibold text-black">Details</span>
          <span>&gt;</span>
          <span>Shipping</span>
          <span>&gt;</span>
          <span>Payment</span>
        </div>

        <form onSubmit={handleSubmit} className='border border-green-300 rounded-md p-4  space-y-4' >
        <div className="flex justify-between items-center mb-4  ">
            <h2 className="text-lg font-semibold text-black">Contact</h2>
           
          </div>
          <div className="mb-4">
          <input
                type="email"
                placeholder="Email or mobile phone number"
                value={checkoutData.contact || ''}
                onChange={(e) => updateCheckoutData({ contact: e.target.value })}
                className="w-full p-2 border focus:border-green-200 focus:outline-none rounded text-black "
                required
              />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-black">
              <input
                type="checkbox"
                checked={checkoutData.subscribe}
                onChange={(e) => updateCheckoutData({ subscribe: e.target.checked })}
                className="mr-2 "
              />
              Add me to Candleaf newsletter for a 10% discount
            </label>
          </div>

          <h2 className="text-lg font-semibold mb-4 text-black">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={checkoutData.shippingAddress.firstName}
              onChange={(e) =>
                updateCheckoutData({
                  shippingAddress: { ...checkoutData.shippingAddress, firstName: e.target.value },
                })
              }
              className="w-full p-2 border rounded focus:border-green-200 focus:outline-none text-black"
              required
            />
            <input
              type="text"
              placeholder="Second Name"
              value={checkoutData.shippingAddress.lastName}
              onChange={(e) =>
                updateCheckoutData({
                  shippingAddress: { ...checkoutData.shippingAddress, lastName: e.target.value },
                })
              }
              className="w-full p-2 border rounded focus:border-green-200 focus:outline-none text-black"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Address and number"
              value={checkoutData.shippingAddress.address}
              onChange={(e) =>
                updateCheckoutData({
                  shippingAddress: { ...checkoutData.shippingAddress, address: e.target.value },
                })
              }
              className="w-full p-2 border rounded focus:border-green-200 focus:outline-none text-black"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              value={checkoutData.shippingAddress.city}
              onChange={(e) =>
                updateCheckoutData({
                  shippingAddress: { ...checkoutData.shippingAddress, city: e.target.value },
                })
              }
              className="w-full p-2 border rounded focus:border-green-200 focus:outline-none text-black"
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={checkoutData.shippingAddress.postalCode}
              onChange={(e) =>
                updateCheckoutData({
                  shippingAddress: { ...checkoutData.shippingAddress, postalCode: e.target.value },
                })
              }
              className="w-full p-2 border rounded focus:border-green-200 focus:outline-none text-black"
              required
            />
            <select
              value={checkoutData.shippingAddress.country}
              onChange={(e) =>
                updateCheckoutData({
                  shippingAddress: { ...checkoutData.shippingAddress, country: e.target.value },
                })
              }
              className="w-full p-2 border rounded focus:border-green-200 focus:outline-none text-black"
            >
              <option value="Italy">Italy</option>

            </select>
          </div>
          <div className="mb-4">
            <label className="flex items-center text-black">
              <input
                type="checkbox"
                checked={checkoutData.saveInfo}
                onChange={(e) => updateCheckoutData({ saveInfo: e.target.checked })}
                className="mr-2"
              />
              Save this information for a future fast checkout
            </label>
          </div>
          <div className="flex justify-between">
            <Link href="/cart" className="text-green-600">Back to cart</Link>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
              Go to shipping
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default CheckoutDetails;