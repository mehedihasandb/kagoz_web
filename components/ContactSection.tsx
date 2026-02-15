// components/ContactSection.tsx
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-black mb-8">
          Contact Us
        </h2>

        <div className="grid gap-10 md:grid-cols-2">

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-6">
              Get In Touch
            </h3>

            <div className="space-y-6 text-gray-700">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-blue-900 mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Address</h4>
                  <p>
                    A-8, House 11, Road 14/C, Sector-4, Uttara, Dhaka-1230
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaPhoneAlt className="text-blue-900 mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Phone</h4>
                  <p>+880 1711-131337</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaEnvelope className="text-blue-900 mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Email</h4>
                  <p>sales@kagoz.net</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-black mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
