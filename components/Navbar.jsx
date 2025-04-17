"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const cartContext = useCart();
  console.log("Navbar: cartContext:", cartContext);
  const router = useRouter();
  const { cart } = cartContext;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openModal = (register = false) => {
    setIsRegister(register);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleUserIconClick = () => {
    if (!user) {
      router.push("/Register");
    }
  };
  return (
    <>
      <nav className="flex items-center justify-between p-6  bg-white shadow-md border-b   ">
        <div className="md:hidden p-5">
          <button onClick={toggleMenu} className="text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2 ">
          <div className="w-6 h-6 bg-green-300 rounded-full ml-7 md:ml-5 "></div>
          <span className="text-xl font-bold text-black ">
            Candleaf
          </span>
        </div>

        <div className=" hidden   md:flex  items-center space-x-25 text-lg ">
          <Link
            href="/discovery"
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            Discovery
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">
            Contact us
          </Link>
        </div>



        <div className="flex justify-center space-x-5">
          {user ? (
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-600"> {user.username}</span>
              <button
                onClick={logout}
                className="text-black hover:text-gray-800 bg-red-300 rounded-2xl p-2 "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
               onClick={handleUserIconClick}
                className="text-gray-600 hover:text-gray-800  "
              >
                <svg
                  className="w-6 h-6 text-black cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          )}

          <Link href="/cart" className="relative mr-7 items-center">
            <svg
              className="w-6 h-6 text-black cursor-pointer"
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
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t px-6 py-4 space-y-4 text-lg text-center">
          <Link href="/discovery" className="block text-gray-600 hover:text-gray-800">
            Discovery
          </Link>
          <Link href="/about" className="block text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="block text-gray-600 hover:text-gray-800">
            Contact us
          </Link>
          </div>)}
    </>
  );
};

export default Navbar;
