import BannerImage from "@/components/BannerImage";
import MapSection from "@/components/MapSection";
import Image from "next/image";

// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className=" bg-white text-black">
      <div>
         <BannerImage imageSrc="/assets/images/contactus.gif" className="h-[82vh]"/>
      </div>
      <div>
        <div className="pt-12 pb-8">
          <h1 className="text-2xl md:text-4xl text-green-900 text-center font-bold mb-6 uppercase font-graduate">
            Contact & Directions
          </h1>
          <h3 className="text-xl md:text-2xl text-yellow-500 text-center font-bold">
            Get In Touch
          </h3>
        </div>
        <div className="max-w-[90%] lg:max-w-[60%] mx-auto bg-white p-6 shadow-lg rounded border flex flex-col gap-3 justify-center text-center">
          <div className="">
            <strong className="">Address:</strong>
            <p>Shimultoly, Gazipur Cantonment, Gazipur-1703</p>
          </div>
          <div>
            <strong>Telephone:</strong>
            <p>02-224494021 ext 5328</p>
          </div>
          <div>
            <strong>Mobile:</strong>
            <p>For Golf Club: 01769-044116</p>
            <p>For Restaurent: 01836-851683</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>General Inquiries: bofgolf@gmail.com</p>
            <p>Membership Info: bofgolf@gmail.com</p>
            <p>Event Booking: bofgolf@gmail.com</p>
          </div>
          <div>
            <strong>Opening Hours:</strong>
            <p>Day: Saturday-Friday</p>
            <p>Time: 07:00AM - 07:00PM</p>
           
          </div>
        </div>
        {/* <form className="max-w-[60%]  mx-auto bg-white p-6 shadow-lg rounded border">
          <div className="flex w-full gap-4">
            <div className="mb-4 w-full">
              <label htmlFor="firstname" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="w-full border p-2"
                placeholder="Your First name"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="lastname" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="w-full border p-2"
                placeholder="Your Last name"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-4 w-full">
              <label htmlFor="phone" className="block mb-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="w-full border p-2"
                placeholder="Your Phone"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border p-2"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Additional Information
            </label>
            <textarea
              id="message"
              className="w-full border p-2"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-1/4 bg-[#1a572b] text-[#e6e428] px-4 py-2 rounded hover:bg-[#1a572b] uppercase"
          >
            Submit
          </button>
        </form> */}
        <div className="pt-5 md:pt-12">
          <div className="py-3 text-center px-2">
            <h2 className="font-semibold text-2xl md:text-3xl text-yellow-500 pb-3 md:pb-6">
              Visit Us
            </h2>
            <h3 className="font-semibold text-base md:text-lg uppercase">
              Gazipur Cantonment, Gazipur, Dhaka, Bangladesh
            </h3>
          </div>
          <MapSection mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.886461744124!2d90.41010938678829!3d24.03506862230759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755db00538b553d%3A0x9721870e45ed03e!2sGolf%20Club%20House!5e0!3m2!1sen!2sbd!4v1746706011631!5m2!1sen!2sbd" />
        </div>
      </div>
    </div>
  );
}
