import Image from "next/image";
import placeholder from "@/assets/media/images/workinprogress.png";

export default function Page() {
  return (
    <main className="justify-around">
      <div className="relative animate-swaying w-1 h-1 overflow-visible">
        <span className="absolute w-48 h-48 -left-24">
          <Image src={placeholder} alt="" width={200} height={200} />
        </span>
      </div>
      <br />
    </main>
  );
}
