
"use client";
import { useGetCourseQuery } from "@/api/additionalApi/jsonApi";
import BannerImage from "@/components/BannerImage";
import { useEffect, useState } from "react";
import { GiCircle } from "react-icons/gi";

export default function CoursePage() {
  const {data, isLoading} = useGetCourseQuery({})
  const courses = data?.result || [];
  const [currentVideo, setCurrentVideo] = useState({});

  useEffect(() => {
    if (courses.length > 0) {
      const videos = courses.reduce((acc, course) => {
        if (course?.videoSource && course.videoSource.length > 0) {
          acc[course.id] = course.videoSource[0];
        }
        return acc;
      }, {});

      setCurrentVideo(videos);
    }
  }, [courses]);

  function isYouTubeLink(url: string): boolean {
    return url?.includes("youtube.com") || url?.includes("youtu.be");
  }

  function toEmbedURL(url: string): string {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }

  const handleChangeVideo = (courseId: number, videoId: number) => {
    const newVideo = courses
      .find((section) => section.id === courseId)
      ?.videoSource.find((video) => video.id === videoId);
    if (newVideo) {
      setCurrentVideo((prev) => ({
        ...prev,
        [courseId]: newVideo,
      }));
    }
  };

  if(isLoading){
    return <h1>Loading....</h1>
  }

  return (
    <div className="text-black pb-12 bg-white">
      {courses?.map((course) => {
        const currentVideos = currentVideo[course.id];
        return (
          <div key={course.id}>
            <BannerImage
              imageSrc={
                course.imagePath
                  ? `${course.imagePath}`
                  : "/assets/images/course.gif"
              }
            />
            <div className="max-w-7xl mx-auto px-2">
              <div className="w-full flex justify-center py-10">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-center font-bold text-2xl md:text-4xl py-4 uppercase font-graduate">{`${course?.title}`}</h2>
                  <h3 className="leading-tight lg:leading-loose text-center text-xl md:text-3xl text-yellow-500 ">
                    {course?.subtitle}
                  </h3>
                </div>
              </div>
              <div className=" space-y-16">
                <div
                  className={`relative flex flex-col md:flex-row items-center`}
                >
                  <div className="w-full md:w-2/3 h-full z-0 relative overflow-hidden shadow-xl">
                    <div className="block lg:flex w-full">
                      <div className="flex w-full lg:w-[7%]">
                        <div className="flex w-full mr-0.5  bg-blue-900 lg:flex-col justify-between">
                          {course?.videoSource?.map((video) => {
                            const isSelected = video.id === currentVideos?.id;
                            return (
                              <button
                                key={video.id}
                                className={`ml-0 lg:ml-1 my-0.5 px-3 md:px-4 py-2 h-full text-white ${
                                  isSelected
                                    ? "bg-white text-yellow-600"
                                    : "bg-blue-900"
                                }
                                `}
                                onClick={() =>
                                  handleChangeVideo(course.id, video.id)
                                }
                              >
                                {video.id}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="aspect-video w-full lg:w-[93%]">
                        {isYouTubeLink(currentVideos?.videoSrc) ? (
                          <iframe
                            src={toEmbedURL(currentVideos.videoSrc)}
                            className="w-full h-full"
                            title={currentVideos.title}
                            allowFullScreen
                          />
                        ) : (
                          <video
                            key={currentVideos?.videoSrc}
                            controls
                            className="w-full h-full"
                            preload="auto"
                          >
                            <source
                              src={currentVideos?.videoSrc}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 ml-0 lg:-ml-10 z-10 shadow-xl relative bg-white p-4 md:p-8">
                    <h2 className="text-3xl font-bold mb-2 text-[#1a572b] uppercase">
                      {/* {` #${data.id} - Par ${data.id}`} */}
                      {` #TEE NO: ${currentVideos?.id}`}
                    </h2>
                    <div className="flex flex-col gap-2 md:gap-2 justify-between py-4 my-4 border-y border-slate-200">
                      {currentVideos?.description?.point?.map((point: any) => {
                        return (
                          <p
                            className="flex justify-start items-center gap-2"
                            key={point.id}
                          >
                            <GiCircle
                              style={{
                                color: point.color || "",
                                backgroundColor: point.color || "",
                                fontSize: "0.9rem",
                              }}
                              className={`rounded-full`}
                            />{" "}
                            {point.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
