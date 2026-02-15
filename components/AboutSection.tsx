// components/AboutSection.tsx
export default function AboutSection() {
    return (
      <section id="about" className="py-12">
        <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda">
          <h2 className="text-3xl text-black font-bold mb-6 ">About Us</h2>
          <p className="text-gray-700 mb-4">
            We believe that quality communication starts with the right foundation. We are a leading supplier of premium paper products in Bangladesh, dedicated to bridging the gap between high-end manufacturing and affordable pricing.
          </p>
          <p className="text-gray-700">
            {/* We offer a wide range of amenities, including dining, event hosting, and more. Whether
            you’re a seasoned golfer or just starting out, our dedicated staff is here to ensure you
            have a memorable experience every time you visit. */}
            Trusted by prestigious organizations like the Bangladesh Army and Dhaka University, we maintain a strong inventory to reliably meet high-volume needs, even during shortages or price hikes.
            Our commitment to precision means when you order 80 GSM, you get exactly that—no underweight reams, no mixed grades.
          </p>
        </div>
      </section>
    );
  }
  