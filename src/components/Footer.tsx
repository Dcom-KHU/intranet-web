import DCOMLogo from "../assets/dcom-logo-black.png";
import { FaInstagram } from "react-icons/fa";
import { SiNotion } from "react-icons/si"; 

export default function Footer() {
  return (
    <footer className="flex h-16 mt-5 pl-3 pr-3 items-center justify-between bg-white/95 text-sm text-gray-400 backdrop-blur-sm">
        <div className="flex items-center gap-7">
            <img src={DCOMLogo} alt="DCOM Logo" className="h-16 object-contain pl-4 p-1 opacity-25" />
            <p>since 1999</p>
            <p>
                &copy; {new Date().getFullYear()} DCOM. All rights reserved.
            </p>
        </div>
        <div className="flex gap-5">
            <FaInstagram 
                size={21} 
                onClick={() => window.open("https://www.instagram.com/d.com_official", "_blank")} 
                className="cursor-pointer"
            />
            <SiNotion 
                size={21} 
                onClick={() => window.open("https://www.notion.so", "_blank")} 
                className="cursor-pointer" 
            />
        </div>
    </footer>
  );
}