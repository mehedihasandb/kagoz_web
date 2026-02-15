import React from "react";
import Slider from "react-slick";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
export default function ThumbnailSlider({ group, baseUrl, thumbsToShow }: any) {
  const [selectedItem, setSelectedItem] = useState(group?.images);

  useEffect(() => {
    if (group) {
      setSelectedItem(group?.images);
    }
  }, [group]);

  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const [navLg1, setLgNav1] = useState<any>(null);
  const [navLg2, setLgNav2] = useState<any>(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const sliderLg1 = useRef(null);
  const sliderLg2 = useRef(null);

  useEffect(() => {
    if (selectedItem) {
      setNav1(slider1.current);
      setNav2(slider2.current);
      setLgNav1(sliderLg1.current);
      setLgNav2(sliderLg2.current);
    }
  }, [selectedItem]);

  const mobileSettingsMain = {
    arrows: true,
    asNavFor: nav2,
    ref: slider1,
    adaptiveHeight: true,
  };

  const mobileSettingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    ref: slider2,
    focusOnSelect: true,
    dots: false,
    centerMode: true,
    centerPadding: "0px",
  };

  const settingsMain = {
    asNavFor: navLg2,
    ref: sliderLg1,
    adaptiveHeight: true,
  };
  const settingsThumbs = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: navLg1,
    ref: sliderLg2,
    focusOnSelect: true,
    dots: false,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <>
      <div className="lg:hidden">
        {selectedItem?.length < 2 ? (
          <div className="p-4">
            <div className="flex justify-center items-center">
              <div className="w-full flex justify-center items-center">
                <Image
                  src={baseUrl + selectedItem[0]?.photo} // Show the first media image as the main image
                  alt={`Main Slide`}
                  className="w-[75%] md:w-[50%] h-auto object-cover"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="m-2">
              <Slider {...mobileSettingsMain} ref={slider1}>
                {selectedItem?.map((img: any, idx: any) => (
                  <div key={idx} className="flex justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                      <Image
                        src={baseUrl + img.mediaFile} // Use the mediaFile fro
                        alt={`Slide ${idx}`}
                        loading="lazy"
                        className="w-[75%] md:w-[50%] h-auto object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="m-2">
              <Slider {...mobileSettingsThumbs} ref={slider2}>
                {selectedItem?.map((img: any, idx: any) => (
                  <div key={idx} className="m-1">
                    <img
                      src={baseUrl + img.mediaFile} 
                      alt={`Thumbnail ${idx}`}
                      className="m-1 border w-[80%] md:w-[50%] h-full cursor-pointer transform transition duration-300 hover:scale-105 hover:border-orange-500"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        {selectedItem?.length < 2 ? (
          <div className="w-full">
            <div
              className="flex justify-center items-center"
              style={{ height: "calc(100vw / 4)" }}
            >
              <Image
                width="90%"
                height="100%"
                src={baseUrl + group?.photo}
                alt={`Slide`}
                className="object-contain lg:max-w-full lg:h-auto lg:mx-auto "
              />
            </div>
          </div>
        ) : (
          <div className="">
            <>
              <div className="m-2 h-auto">
                <Slider {...settingsMain} ref={sliderLg1}>
                  {selectedItem?.map((img: any, idx: any) => (
                    <div key={idx} className="flex justify-center items-center">
                      <Image
                        src={baseUrl + img?.mediaFile}
                        alt={`Slide ${idx}`}
                        className="lg:max-w-full lg:h-auto lg:mx-auto"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="m-2">
                <Slider {...settingsThumbs} ref={sliderLg2} className="mt-4">
                  {selectedItem?.map((img: any, idx: any) => (
                    <div key={idx} className="m-1 p-2">
                      <Image
                        src={baseUrl + img?.mediaFile}
                        alt={`Thumbnail ${idx}`}
                        className="m-1 border w-[85%] h-auto cursor-pointer transform transition duration-300 hover:scale-105 hover:border-orange-500"
                        preview={false}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
}
