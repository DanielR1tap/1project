"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CheckoutConfirmation = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { checkoutData, clearCheckoutData } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
    if (!checkoutData.orderNumber) {
      router.push("/checkout/details");
    }
  }, [user, checkoutData.orderNumber, router]);

  const handleBackToShopping = () => {
    clearCheckoutData();
    router.push("/product");
  };

  if (!user || !checkoutData.orderNumber) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = checkoutData.shippingMethod === "standard" ? 0 : 5;
  const totalBeforeDiscount = subtotal + shippingCost;
  const total = totalBeforeDiscount - checkoutData.discount;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 min-h-screen">
      <div className="md:w-2/3">
        <div className="flex space-x-4 mb-6">
          <Link href="/cart" className="text-green-300">
            Cart
          </Link>
          <span>&gt;</span>
          <Link href="/checkout/details" className="text-green-300">
            Details
          </Link>
          <span>&gt;</span>
          <Link href="/checkout/shipping" className="text-green-300">
            Shipping
          </Link>
          <span>&gt;</span>
          <Link href="/checkout/payment" className="text-green-300">
            Payment
          </Link>
        </div>

        <div className=" items-center">
          <div className="flex justify-center mb-6">
            <img src="/image/CheckCircle.png" alt="CheckCircle.png" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-center text-black">
            Payment Confirmed
          </h2>
          <p className="mb-4 text-center text-green-300">
            ORDER #{checkoutData.orderNumber}
          </p>
          <p className="mb-4 text-center text-black">
            Thank you {checkoutData.shippingAddress.firstName} for buying
            Candleaf. The nature is grateful to you. Now that your order is
            confirmed it will be ready to ship in 2 days. Please check your
            inbox in the future for your order updates.
          </p>
          <div className=" space-y-3 flex justify-center gap-5 items-center">
            <button
              onClick={handleBackToShopping}
              className="bg-green-600 text-white px-6 py-2 rounded  "
            >
              Back to shopping
            </button>
            <Link href="#" className="text-green-600">
              Print receipt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
