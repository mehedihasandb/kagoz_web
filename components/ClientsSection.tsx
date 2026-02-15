// components/ClientsSection.tsx
import { FaBuilding } from "react-icons/fa";

export default function ClientsSection() {
  return (
    <section id="clients" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-black mb-6">
          Our Clients
        </h2>

        {/* Description */}
        <p className="text-gray-700 mb-8 max-w-3xl">
          We have collaborated with various industries and maintain strong
          partnerships with prestigious organizations:
        </p>

        {/* Clients Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaBuilding className="text-blue-900" />
            <span className="font-medium text-gray-800">
              Bangladesh Army
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaBuilding className="text-blue-900" />
            <span className="font-medium text-gray-800">
              Dhaka University
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaBuilding className="text-blue-900" />
            <span className="font-medium text-gray-800">
              Hotel Sirena
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaBuilding className="text-blue-900" />
            <span className="font-medium text-gray-800">
              DESCO
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaBuilding className="text-blue-900" />
            <span className="font-medium text-gray-800">
              Bangladesh Machine Tools Factory
            </span>
          </div>
        </div>

        {/* Closing Text */}
        <p className="text-gray-700 max-w-3xl">
          These partnerships demonstrate our ability to tailor solutions to
          unique client needs across different sectors.
        </p>

      </div>
    </section>
  );
}
