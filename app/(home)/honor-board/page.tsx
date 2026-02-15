'use client';

import leadership from "@/data/clubLeadership.json";
import SectionRenderer from "@/components/SectionRenderer";

export default function AboutClub() {
  return (
    <div className="bg-white">

      {leadership.sections.map((section) => (
        <SectionRenderer  key={section.id} data={section} />
      ))}

    </div>
  );
}
