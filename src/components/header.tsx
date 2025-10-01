import Image from "next/image";
import logo from "../../public/fullicon.svg";

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <div className="flex justify-between w-full my-1 mb-4 py-2 border-b-2">
      <h2 className="text-xl font-bold ">{pageTitle}</h2>
      <div>
        <Image src={logo} alt="log" width={120} height={120} />
      </div>
    </div>
  );
};
