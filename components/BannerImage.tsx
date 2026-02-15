
import Image from "next/image";
interface imageProps {
    imageSrc?: any;
    className?:any
}
export default function BannerImage({imageSrc, className}:imageProps) {
    return (
        <div className={`relative w-full overflow-hidden ${className ? className : 'h-[60vh]'}`}>
        <Image
          src={imageSrc}
          alt="leadership"
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }
  