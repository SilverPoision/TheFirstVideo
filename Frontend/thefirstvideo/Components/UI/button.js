import Image from "next/image";

export default function Button() {
  return (
    <Image
      src={`/static/google_btn.png`}
      alt={"google button"}
      width={330}
      height={80}
    />
  );
}
