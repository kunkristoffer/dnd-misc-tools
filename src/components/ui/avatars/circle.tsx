import Image from "next/image";

interface AvatarCircularProps {
  href: string;
  size?: number;
  className?: React.ComponentProps<"img">["className"];
}

export function AvatarCircular({ href, size, className }: AvatarCircularProps) {
  return (
    <Image
      src={href}
      alt="An avatar picture"
      width={size ?? 24}
      height={size ?? 24}
      className={`${className} rounded-full`}
    />
  );
}
