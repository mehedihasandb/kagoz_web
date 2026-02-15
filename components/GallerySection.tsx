
import {Image} from "antd";
import { useState } from "react";

export default function GallerySection() {
  const [showAll, setShowAll] = useState(false);
  const galleryImages = Array.from({ length: 20 }, (_, i) => `/assets/images/gallary/${i + 1}.jpg`);
  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 4);
  return (
    <section id="gallery" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <h2 className="text-3xl text-[#1a572b] font-bold mb-8 text-center">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {visibleImages?.map((image, i) => (
            <div className="overflow-hidden" key={i}>
              <Image
                src={image ? image : '/assets/images/gallary/img1.jpeg'}
                alt={`"Gallery Image " ${i}`}
                // width={300}
                // height={200}
                className="w-full rounded-lg h-auto transform hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
        {!showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
