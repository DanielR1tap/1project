import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#272727] py-6 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-5">

          <div className=" flex flex-col items-center sm:items-start">
            <div className="flex items-center mb-4 ">
              <img src="/image/icon.png" alt="" />
              <h2 className="text-lg font-semibold pl-5">Candleaf</h2>
            </div>
            <p className="text-white text-xs text-center mr-12">
              Your natural candle made for <br /> your home and for your
              wellness.
            </p>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold mb-4 text-[#56B280]">
              Discovery
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>New season</li>
              <li>Most searched</li>
              <li>Most sold</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#56B280]">About</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Help</li>
              <li>Shipping</li>
              <li>Affiliate</li>
            </ul>
          </div>
          <div className="pl-4">
            <h3 className="text-lg font-semibold mb-4 text-[#56B280]">Info</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Contact us</li>
              <li>Privacy Policies</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
