// components/PaperProductsSection.tsx
import { FaFileAlt, FaTag } from "react-icons/fa";

export default function PaperProductsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda">

        <h2 className="text-3xl text-black font-bold mb-8">
          Our Paper Selection
        </h2>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Paper Sizes & Types */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-black mb-4">
              Available Paper Sizes &amp; Types
            </h3>
            <ul className="space-y-4 text-gray-700 table-auto">
              <li className="flex gap-3">
                <FaFileAlt size={28} className="text-blue-900 mt-1" />
                <span>
                  <strong>A4 (210 × 297 mm):</strong> The international standard, essential for daily office printing, reports, and correspondence.
                </span>
              </li>
              <li className="flex gap-3">
                <FaFileAlt size={28} className="text-blue-900 mt-1" />
                <span>
                  <strong>A3 (297 × 420 mm):</strong> Perfect for presentations, architectural drawings, and larger format printing needs.
                </span>
              </li>
              <li className="flex gap-3">
                <FaFileAlt size={28} className="text-blue-900 mt-1" />
                <span>
                  <strong>Legal (8.5 × 14 inches):</strong> Commonly used for official documents, contracts, and legal forms requiring extended length.
                </span>
              </li>
              <li className="flex gap-3">
                <FaFileAlt size={28} className="text-blue-900 mt-1" />
                <span>
                  <strong>Custom Cuts &amp; Specialty Papers:</strong> From cardstock to recycled options, we can source and cut paper to your precise specifications.
                </span>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-black mb-4">
              Trusted Premium Brands
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3 items-center">
                <FaTag className="text-red-600" />
                Double A
              </li>
              <li className="flex gap-3 items-center">
                <FaTag className="text-red-600" />
                Pretex
              </li>
              <li className="flex gap-3 items-center">
                <FaTag className="text-red-600" />
                Bashundhara Paper
              </li>
              <li className="flex gap-3 items-center">
                <FaTag className="text-red-600" />
                Fresh Paper
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
