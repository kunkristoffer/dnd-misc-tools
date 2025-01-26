import Image from "next/image";
import placeholder from "@/assets/media/images/FrameRound.png";

interface AvatarCircularProps {
  href?: string;
  size?: number;
  className?: React.ComponentProps<"img">["className"];
}

export function AvatarCircular({ href, size, className }: AvatarCircularProps) {
  return (
    <Image
      src={href ?? placeholder}
      alt="An avatar picture"
      width={size ?? 24}
      height={size ?? 24}
      className={`${className} rounded-full`}
    />
  );
}
