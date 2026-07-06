import Image from "next/image";

export default function ArchImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  children,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-b-[1.9rem] rounded-t-[999px] border border-[#B99668]/22 bg-[#18211f] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover object-center ${imageClassName}`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,10,0.04),rgba(18,12,10,0.16)_48%,rgba(18,12,10,0.58)_100%)] ${overlayClassName}`}
      />
      {children}
    </div>
  );
}
