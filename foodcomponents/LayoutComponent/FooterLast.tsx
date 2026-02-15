"use client";
import React from 'react';
import { FaFacebookF, FaGooglePlusG, FaTwitter, FaInstagram, FaRss } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="subfooter bg-primary text-white py-4 px-8">
      <div className="container mx-auto max-w-[1090px]">
        <div className="flex flex-wrap justify-between items-center">
          {/* Footer Left */}
          <div className="w-full md:w-2/3 lg:w-1/2 text-center md:text-left">
            <div className="footer-left">
              <p className="text-xs md:text-sm uppercase">2021-30 Copy Right by BOF Food. Powered by Zayan Tech Ltd.</p>
            </div>
          </div>

          {/* Footer Right */}
          <div className="w-full md:w-1/3 lg:w-1/2 mt-4 md:mt-0">
            <div className="flex flex-col items-center md:items-end">
              <ul className="flex flex-wrap justify-center md:justify-end space-x-2 text-2xl">
                <li className="bg-blue-800 hover:bg-blue-900 rounded-full px-2 py-2 text-sm text-tprimary hover:text-white mb-2 md:mb-0">
                  <a href="javascript:void(0)">
                    <FaFacebookF />
                  </a>
                </li>
                <li className="bg-green-800  rounded-full px-2 py-2 text-sm text-white hover:text-white mb-2 md:mb-0">
                  <a href="javascript:void(0)">
                    <FaGooglePlusG />
                  </a>
                </li>
                <li className="bg-blue-800 hover:bg-blue-900 rounded-full px-2 py-2 text-sm text-white hover:text-white mb-2 md:mb-0">
                  <a href="javascript:void(0)">
                    <FaTwitter />
                  </a>
                </li>
                <li className="bg-red-500  rounded-full px-2 py-2 text-sm text-white hover:text-white mb-2 md:mb-0">
                  <a href="javascript:void(0)">
                    <FaInstagram />
                  </a>
                </li>
                <li className="bg-white hover:bg-blue-900 rounded-full px-2 py-2 text-sm text-gray-800 hover:text-white mb-2 md:mb-0">
                  <a href="javascript:void(0)">
                    <FaRss />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
