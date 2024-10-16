import { useRouter } from "next/router";
import Image from "next/image";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="
        max-h-[90px]
        mb-5
        w-40 
        cursor-pointer
        transition
      "
    >
      <Image
        src="/images/app-logo.png"
        width={500}
        height={500}
        style={{ objectFit: "cover" }}
        alt="logo"
      />
    </div>
  );
};

export default SidebarLogo;
