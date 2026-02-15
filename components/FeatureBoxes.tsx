"use client"
// components/FeatureBoxes.tsx
import Link from 'next/link';

export default function FeatureBoxes() {
  return (
    <section className="py-12 bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Box 1 */}
          <div className="bg-white rounded-tl-5xl rounded-bl-5xl shadow p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Tour the Course</h3>
            <p className="text-gray-600">
              Take a virtual or in-person tour of our renowned golf course.
            </p>
            <Link href="#" className="mt-4 inline-block bg-[#1a572b] text-[#e6e428] px-4 py-2 rounded hover:bg-[#1a572b]">
              Learn More
            </Link>
          </div>
          {/* Feature Box 2 */}
          <div className="bg-white rounded shadow p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Weddings</h3>
            <p className="text-gray-600">
              Plan your dream wedding in our scenic venue.
            </p>
            <Link href="#" className="mt-4 inline-block bg-[#1a572b] text-[#e6e428] px-4 py-2 rounded hover:bg-[#1a572b]">
              Learn More
            </Link>
          </div>
          {/* Feature Box 3 */}
          <div className="bg-white rounded shadow p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Membership</h3>
            <p className="text-gray-600">
              Join an amazing community of golf enthusiasts.
            </p>
            <Link href="#" className="mt-4 inline-block bg-[#1a572b] text-[#e6e428] px-4 py-2 rounded hover:bg-[#1a572b]">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
