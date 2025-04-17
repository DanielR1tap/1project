"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const { user } = useAuth();
  const total = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.product.price.replace("$", "")) * item.quantity,
    0
  );
  const handleCheckout = () => {
    if (!user) {
      router.push('/Register');
    } else {
      router.push('/checkout/details');
    }
  };
  return (
    <div>
      <div className="py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black text-center mb-4">
            Your cart items
          </h1>
          <div className="flex justify-center">
            <Link href="/">
              <button className="bg-gray-200 text-black px-4 py-2 rounded-2xl hover:bg-gray-300">
                Back to shopping
              </button>
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-black text-lg font-medium">
                Your cart is empty
              </p>
              <p className="text-gray-700 mt-2 ">
                Add some products to your cart to get started!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4  gap-4 mb-4  font-medium border-b mt-15">
                <div className="text-black">Product</div>
                <div className="text-black">Price</div>
                <div className="text-black">Qty</div>
                <div className="text-black">Total</div>
              </div>

              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="grid grid-cols-4 gap-4 items-center mb-4 border-b pb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <p className="text-black">{item.product.name}</p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-white text-sm hover:underline bg-green-500 rounded p-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-black">{item.product.price}</div>

                  <div className="flex items-center  border border-gray-300 rounded-lg w-fit">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-black hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-black hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-black">
                    $
                    {(
                      parseFloat(item.product.price.replace("$", "")) *
                      item.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-8">
                <div className="text-right">
                  <p className="text-black font-medium">
                    Sub-total: ${total.toFixed(2)}
                  </p>
                  <p className="text-gray-200 text-sm mb-4">
                    Tax and shipping cost will be calculated later
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-black transition"
                  >
                    Check-out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
