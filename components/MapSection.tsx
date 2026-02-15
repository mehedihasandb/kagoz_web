import React from 'react';

interface MapSectionProps {
  mapSrc: string;
  title?: string;
  address?: string;
  phone?: string;
  className?: string;
}

const MapSection: React.FC<MapSectionProps> = ({
  mapSrc,
  className = "",
}) => {
  return (
    <section className={`bg-white ${className}`}>
      <div className=" ">
        <div className="max-w-7xl mx-auto px-2">
          <iframe
            className="w-full h-[600px]  shadow-xl border-0"
            src={mapSrc}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>

        </div>

      </div>
    </section>
  );
};

export default MapSection;