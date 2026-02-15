'use client';

import Image from "next/image";

export default function SectionRenderer({ data }) {
  const { title, person, honorBoard } = data;

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        
        {/* Image */}
        <div className="md:w-[40%] text-center">
          <Image
            src={person.image}
            alt={person.name}
            width={500}
            height={600}
            className="rounded-lg shadow-lg object-cover mx-auto"
          />
          <p className="text-gray-600 text-lg font-semibold mt-3">{person.name}</p>
          <p className="text-gray-600">{person.rank}</p>
        </div>

        {/* Description */}
        <div className="md:w-[60%]">
          <h2 className="text-4xl font-light text-green-700 mb-3">{title}</h2>
          <p className="text-gray-700">{person.description}</p>
        </div>
      </div>

      {/* Honor Board Title */}
      <h2 className="text-center text-4xl font-light mt-16">
        <span className="text-red-600">{honorBoard.titleRed}</span>{" "}
        <span className="text-green-700">{honorBoard.titleGreen}</span>
      </h2>

      {/* Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">

        {honorBoard.members.map((m, index) => (
          <div key={index} className="text-center w-full">

            <div className={`w-full ${m.type === "portrait" ? "h-64" : "h-52"} overflow-hidden rounded-md flex justify-center`}>
              <Image
                src={m.image}
                alt={m.name}
                width={300}
                height={400}
                className="object-cover h-full w-auto mx-auto rounded-md shadow-md"
              />
            </div>

            <p className="text-gray-600 font-semibold mt-3">{m.name}</p>
            <p className="text-sm text-gray-600">{m.rank}</p>
            <p className="text-sm text-gray-500">{m.duration}</p>

          </div>
        ))}

      </div>
    </div>
  );
}
