// components/AdvantagesSection.tsx
import {
  FaShieldAlt,
  FaBalanceScale,
  FaComments,
  FaClock,
} from "react-icons/fa";

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="py-12">
      <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda">
        
        <h2 className="text-3xl text-black font-bold mb-8">
          Our Advantages
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">

          {/* Trusted by Leaders */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaShieldAlt className="text-3xl text-blue-900 mb-4" />
            <h4 className="text-lg font-semibold text-black mb-2">
              Trusted by Leaders
            </h4>
            <p className="text-gray-700">
              Trusted by the Bangladesh Army and Dhaka University for reliable,
              high-volume supply.
            </p>
          </div>

          {/* Precision Guaranteed */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaBalanceScale className="text-3xl text-blue-900 mb-4" />
            <h4 className="text-lg font-semibold text-black mb-2">
              Precision Guaranteed
            </h4>
            <p className="text-gray-700">
              When you order 80 GSM, you get exactly that—no underweight reams,
              no mixed grades.
            </p>
          </div>

          {/* Transparent Communication */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaComments className="text-3xl text-blue-900 mb-4" />
            <h4 className="text-lg font-semibold text-black mb-2">
              Transparent Communication
            </h4>
            <p className="text-gray-700">
              Transparent and responsive communication throughout the entire
              process.
            </p>
          </div>

          {/* Commitment to Deadlines */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaClock className="text-3xl text-blue-900 mb-4" />
            <h4 className="text-lg font-semibold text-black mb-2">
              Commitment to Deadlines
            </h4>
            <p className="text-gray-700">
              Unwavering commitment to deadlines without compromising on quality.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
