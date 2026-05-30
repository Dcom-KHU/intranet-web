import dcomLogo from "../../assets/dcom-logo-black.png";
import { navMenu } from "./navMenu";

interface DesktopNavbarProps {
  currentPath: string;
  isAdmin: boolean;
  onNavigate: (path: string) => void;
}

export default function DesktopNavbar({
  currentPath,
  isAdmin,
  onNavigate,
}: DesktopNavbarProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="fixed left-0 right-0 top-0 pr-10 z-10 hidden h-20 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm md:block">
      <div className="flex h-full items-center justify-between px-10">
        <h2 className="cursor-pointer" onClick={() => onNavigate("/home")}>
          <img
            src={dcomLogo}
            alt="DCOM Logo"
            className="mr-2 inline-block w-20 flex-shrink-0"
          />
        </h2>

        <div className="flex items-center gap-20 mr-32 whitespace-nowrap">
          <ul className="flex flex-row gap-10">
            {navMenu.map((item) => (
              <li
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`cursor-pointer font-bold transition-colors hover:text-blue-400 ${
                  isActive(item.path) ? "text-blue-500" : "text-black"
                }`}
              >
                {item.label}
              </li>
            ))}

            {isAdmin && (
              <li
                onClick={() => onNavigate("/manage")}
                className={`cursor-pointer font-bold transition-colors hover:text-blue-400 ${
                  isActive("/manage") ? "text-blue-500" : "text-black"
                }`}
              >
                관리
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
