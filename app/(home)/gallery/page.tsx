// components/GallerySection.tsx
import Image from 'next/image'
import Gallery1 from "@/assets/images/img1.jpeg"
import Gallery2 from "@/assets/images/img2.jpeg"

export default function GallerySection() {
    return (
        <section id="gallery" className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl text-black font-bold mb-8 text-center">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-2">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-2">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-2">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-2">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-2">
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
        </section>
    );
}
