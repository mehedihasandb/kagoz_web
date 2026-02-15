// components/VisionMissionSection.tsx
export default function VisionMissionSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-3 md:px-4 font-monda grid md:grid-cols-2 gap-8">
        
        {/* Vision */}
        <div id="vision" className="rounded-xl shadow-lg p-4">
          <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
            <i className="fas fa-eye text-red-600"></i>
            Our Vision
          </h3>
          <p className="text-gray-700">
            To become the nation&apos;s most trusted paper partner, recognized for our integrity
            in sourcing and our ability to drive value for our clients through innovation and
            sustainable supply chain practices.
          </p>
        </div>

        {/* Mission */}
        <div id="mission"  className="rounded-lg shadow-xl p-4">
          <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
            <i className="fas fa-bullseye text-red-600"></i>
            Our Mission
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2">
              <span className="text-red-600 font-bold">✓</span>
              Simplify the supply chain by providing premium paper products without compromising performance
            </li>
            <li className="flex gap-2">
              <span className="text-red-600 font-bold">✓</span>
              Build long-term partnerships based on trust and professionalism
            </li>
            <li className="flex gap-2">
              <span className="text-red-600 font-bold">✓</span>
              Source directly from original manufacturers to ensure exact GSM specifications
            </li>
            <li className="flex gap-2">
              <span className="text-red-600 font-bold">✓</span>
              Provide the best experience at every stage of collaboration
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
