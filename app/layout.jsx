"use client";

import { CartProvider } from "@/context/CartContext";
import "/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white">

          <AuthProvider>
            <CartProvider>
              <CheckoutProvider>
                <Navbar />
                {children}
                <Footer/>
                <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
              </CheckoutProvider>
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
