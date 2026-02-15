// components/TestimonialsSection.tsx
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-black mb-2">
          Testimonials
        </h2>

        <p className="text-gray-600 mb-8">
          What our clients say about us
        </p>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaQuoteLeft className="text-blue-900 mb-4" />
            <p className="text-gray-700 mb-4">
              “Professional service with satisfying results. Their paper quality
              has consistently met our high standards for hospitality
              documentation.”
            </p>
            <span className="font-semibold text-gray-900">
              – Hotel Sirena
            </span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaQuoteLeft className="text-blue-900 mb-4" />
            <p className="text-gray-700 mb-4">
              “Strict Standards &amp; Professional Service. We rely on Mahpara
              Zubaer Enterprise for all our paper supply needs due to their
              reliability and quality.”
            </p>
            <span className="font-semibold text-gray-900">
              – Bangladesh Army
            </span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaQuoteLeft className="text-blue-900 mb-4" />
            <p className="text-gray-700 mb-4">
              “Cost-Effective Without Quality Compromise. Their pricing is
              competitive but never at the expense of product quality.”
            </p>
            <span className="font-semibold text-gray-900">
              – DESCO
            </span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <FaQuoteLeft className="text-blue-900 mb-4" />
            <p className="text-gray-700 mb-4">
              “Recommended and high standard of paper quality. Their products
              consistently meet our manufacturing documentation requirements.”
            </p>
            <span className="font-semibold text-gray-900">
              – Bangladesh Machine Tools Factory
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
