"use client";

import Link from "next/link";
import { useState } from "react";
import React from "react";
import products from "@/data/product";
import { useCart } from "/context/CartContext";
import { useParams } from "next/navigation";



export default function ProductPage() {

  const params = useParams();
   const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("one-time");
 const { addToCart } = useCart();
 const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold text-black">
          Product not found
        </h1>
         <Link href="/">
          <p className="mb-6 text-black hover:underline cursor-pointer bg-gray-200  rounded-2xl px-2 py-2  inline-block">
            Back to products
          </p>
        </Link>

      </div>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart(product, quantity, purchaseType);
    console.log(`Added to cart: ${product.name}, Quantity: ${quantity}, Purchase Type: ${purchaseType}`);
    setTimeout(() => setIsAdding(false), 500);};

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <p className="mb-6 text-black hover:underline cursor-pointer bg-gray-200  rounded-2xl px-2 py-2  inline-block">
            ← Back to products
          </p>
        </Link>

        <div className="flex flex-col lg:flex-row items-center">

          <div className="lg:w-1/2  mb-8 lg:mb-0 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-2xs h-auto object-contain bg-gray-200 pb-15 pt-15 rounded-2xl"
            />
          </div>


          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-black mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-green-200 mb-6">{product.price}</p>


            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setPurchaseType("one-time")}
                  className={`px-4 py-2 rounded-lg ${
                    purchaseType === "one-time"
                      ? "bg-green-200 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  One time purchase
                </button>
                <div className="relative">
                  <button
                    onClick={() => setPurchaseType("subscribe")}
                    className={`px-4 py-2 rounded-lg ${
                      purchaseType === "subscribe"
                        ? "bg-green-200 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    Subscribe and delivery every
                  </button>
                  {purchaseType === "subscribe" && (
                    <select
                      className="absolute top-0 left-full ml-2 px-2 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
                      defaultValue="4 weeks"
                    >
                      <option>4 weeks</option>
                      <option>2 weeks</option>
                      <option>1 week</option>
                    </select>
                  )}
                </div>
              </div>
              {purchaseType === "subscribe" && (
                <p className="text-sm text-black mt-2">
                  Subscribe now and get the 10% of discount on every recurring order. The discount will be applied at checkout.{" "}
                  <span className="text-green-200 underline cursor-pointer">
                    See details
                  </span>
                </p>
              )}
            </div>


            <div className="mb-6 flex items-center space-x-4">
              <span className="text-black font-medium">QUANTITY</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 text-black"
                >
                  −
                </button>
                <span className="px-4 py-2 tex-black">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 text-black"
                >
                  +
                </button>
              </div>
            </div>


            <button
              onClick={handleAddToCart}
              className="w-full bg-green-400 text-white py-3 rounded-lg hover:bg-green-950 transition flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
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
              <span>Add cart</span>
            </button>


            <div className="mt-6 text-black text-sm">
              <p>
                <strong>Wax:</strong> {product.details.wax}
              </p>
              <p>
                <strong>Fragrance:</strong> {product.details.fragrance}
              </p>
              <p>
                <strong>Burning Time:</strong> {product.details.burningTime}
              </p>
              <p>
                <strong>Dimension:</strong> {product.details.dimensions}
              </p>
              <p>
                <strong>Weight:</strong> {product.details.weight}
              </p>
            </div>


            <div className="mt-6">
              <p className="text-black mb-2">{product.description}</p>
              <p className="text-green-200 font-medium">
                🚚 FREE SHIPPING
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}