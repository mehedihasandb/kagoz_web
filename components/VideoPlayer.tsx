"use client";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type VideoPlayerProps = {
  src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  useEffect(() => {
    setIsClient(true);
  }, []);
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (videoRef.current && !playerRef.current) {
//         playerRef.current = videojs(videoRef.current, {
//           controls: true,
//           autoplay: false,
//           preload: "auto",
//           playbackRates: [0.5, 1, 1.5, 2],
//           responsive: true,
//           fluid: true,
//           sources: [
//             {
//               src,
//               type: "video/mp4",
//             },
//           ],
//         });

//         console.log("Video.js player initialized", playerRef.current);
//       }
//     }, 0);

//     return () => {
//       clearTimeout(timeout);
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [src]);

useEffect(() => {
    if (isClient && videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.src({ src, type: "video/mp4" });
    }
  }, [src]);
  useEffect(() => {
    if (src) {
      setVideoSrc(src)
    }
  }, [src]);

  console.log(src, " src");
  console.log(videoRef, "video src");
  console.log(playerRef, "play ref");
  if (!isClient) return null;

  return (
    <video controls width="100%" preload="metadata" className="rounded">
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
