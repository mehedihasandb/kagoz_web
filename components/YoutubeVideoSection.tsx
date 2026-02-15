import React from 'react';

interface YoutubeVideoSectionProps {
  title?: string;
  className?: string;
}

const YoutubeVideoSection: React.FC<YoutubeVideoSectionProps> = ({
  title = "Featured Golf Tips",
  className = "",
}) => {
  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1a572b]">{title}</h2>
        <div className="">
          <iframe
            className="w-full h-96 rounded-lg shadow-xl"
            src={`https://www.youtube.com/embed/zrbe1HTrpao?si=ZJUwlbg3qenPtDrt`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        
        </div>
      </div>
    </section>
  );
};

export default YoutubeVideoSection;