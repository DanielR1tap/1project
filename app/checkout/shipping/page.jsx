"use client";

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CheckoutShipping = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { checkoutData, updateCheckoutData } = useCheckout();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/checkout/payment');
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">

      <div className="md:w-2/3 min-h-screen">

        <div className="flex space-x-4 mb-6">
          <Link href="/cart" className='text-green-500'>Cart</Link>
          <span>&gt;</span>
          <Link href="/checkout/details" className='text-green-500'>Details</Link>
          <span>&gt;</span>
          <span className="font-semibold text-black">Shipping</span>
          <span>&gt;</span>
          <span>Payment</span>
        </div>

        <form onSubmit={handleSubmit} className="mb-4 border rounded-md p-4  space-y-4  border-green-200">
          <div className="mb-4 border rounded-md p-4  space-y-4 border-green-200">
            <p className='text-black'>Contact: {checkoutData.contact ||""}</p>
            <Link href="/checkout/details" className="text-green-600">Edit</Link>
          </div>
          <div className="mb-4  border rounded-md p-4  space-y-4 border-green-200 ">
            <p className='text-black'>
              Ship to: {checkoutData.shippingAddress.address}, {checkoutData.shippingAddress.city},
              {checkoutData.shippingAddress.postalCode}, {checkoutData.shippingAddress.country}
            </p>
            <Link href="/checkout/details" className="text-green-600">Edit</Link>
          </div>
          <h2 className="text-lg font-semibold mb-4 text-black">Shipping method</h2>
          <div className="mb-4">
            <label className="flex items-center p-2 border rounded border-green-200">
              <input
                type="radio"
                name="shippingMethod"
                value="standard"
                checked={checkoutData.shippingMethod === 'standard'}
                onChange={(e) => updateCheckoutData({ shippingMethod: e.target.value })}
                className="mr-2"
              />
              Standard Shipping - Free
            </label>
          </div>
          <div className="flex justify-between">
            <Link href="/checkout/details" className="text-green-600">Back to details</Link>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
              Go to payment
            </button>
          </div>
        </form>
      </div>
      </div>
  )
  };

  export default CheckoutShipping;