// components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-col items-start bg-white border-r border-gray-300 h-screen p-4">
      <div className="mb-8">
        <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
      </div>
      <ul className="space-y-4 text-lg font-normal">
        <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
          <Link href="#" className="flex items-center">
            <Image src="/images/gozat-icon.png" alt="Göz At" width={20} height={20} className="mr-2" />
            Göz At
          </Link>
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
          <Link href="/kurslarim" className="flex items-center">
            <Image src="/images/course-icon.png" alt="Kurslarım" width={20} height={20} className="mr-2" />
            Kurslarım
          </Link>
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
          <Link href="/not-defterim" className="flex items-center">
            <Image src="/images/notebook-icon.png" alt="Not Defterim" width={20} height={20} className="mr-2" />
            Not Defterim
          </Link>
        </li>
        <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
          <Link href="#" className="flex items-center">
            <Image src="/images/uniai-icon.png" alt="Uniai" width={28} height={28} className="mr-2" />
            Uniai
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
