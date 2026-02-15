"use client";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#0042d7] text-gray-300 py-8 font-monda">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
          <p>A-8, House 11,Road 14/C</p>
          <p>Sector-4, Uttara, Dhaka-1230</p>
          <p>Bangladesh</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p>Phone: +880 1711-131337</p>
          <p>Email: sales@kagoz.net</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Opening Time</h3>
          <p>For Winter: 10.00-19.00 Hrs</p>
          <p>For Summer: 09.00-17.00 Hrs</p>
        </div>
        <div className="">
          <h3 className="text-xl font-semibold mb-4">Kagoz—a concern of Mahpara Zubaer Enterprise, Uttara</h3>
          <p>
            Kagoz, a concern of Mahpara Zubaer Enterprise, Uttara, is dedicated to providing quality stationery and office products. Come explore everything we have to offer.
          </p>
          <div className="flex py-2 gap-4">
            <Link
              href="https://www.facebook.com/pages/Bof%20Golf%20Club,Gazipur/367441289947935/"
              target="blank"
            >
              <span>
                <FaFacebook className="h-8 w-8 bg-blue-500 text-white rounded-full" />
              </span>
            </Link>
            <Link
              href="https://www.youtube.com/watch?v=rWYJehEV8qs"
              target="blank"
            >
              <span>
                <IoLogoYoutube className="h-8 w-8 text-red-600 rounded-xl bg-white p-1" />
              </span>

              {/* <Image
                src="/logo/youtube-logo.png"
                // height={50}
                // width={50}
                alt="bof"
                className="h-8 w-8 m-0"
                preview={false}
              /> */}
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-100">
        &copy; 2025 Kagoz—a concern of Mahpara Zubaer Enterprise, Uttara. All rights reserved.
        <br />
        Developed by Zayan Technology Ltd.
      </div>
    </footer>
  );
}
