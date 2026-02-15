// app/golf/page.tsx
import Image from 'next/image'
import Gallery1 from "@/assets/images/sliders/slider.jpg"
import Gallery2 from "@/assets/images/sliders/slider2.jpg"


export default function GolfPage() {
  return (
    <div className="text-black py-12 px-4 bg-white">
      <div className='my-4'>
        <h1 className="text-4xl font-bold mb-2">Golf</h1>
        <p>Data and images about the golf club.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Gallery Item 1 */}
        <div className="overflow-hidden rounded-lg">
          <Image src={Gallery1} alt="Gallery Image 1"
            className="w-full h-auto transform hover:scale-105 transition duration-300" />
        </div>
        {/* Gallery Item 2 */}
        <div className="overflow-hidden rounded-lg">
          <Image src={Gallery2} alt="Gallery Image 2"
            className="w-full h-auto transform hover:scale-105 transition duration-300" />
        </div>
        {/* Gallery Item 3 */}
        <div className="overflow-hidden rounded-lg">
          <Image src={Gallery1} alt="Gallery Image 3"
            className="w-full h-auto transform hover:scale-105 transition duration-300" />
        </div>
        {/* Gallery Item 4 */}
        <div className="overflow-hidden rounded-lg">
          <Image src={Gallery2} alt="Gallery Image 4"
            className="w-full h-auto transform hover:scale-105 transition duration-300" />
        </div>
        {/* More gallery items as needed */}
      </div>

    </div>
  );
}
