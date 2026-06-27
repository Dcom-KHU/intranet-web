import dcomLogo from "../../assets/dcom-logo-black.png";
import { navMenu } from "./navMenu";
import { useLocation } from "react-router-dom";

interface DesktopNavbarProps {
  isAdmin: boolean;
  onNavigate: (path: string) => void;
  profileMenu?: React.ReactNode;
}

export default function DesktopNavbar({
  isAdmin,
  onNavigate,
  profileMenu,
}: DesktopNavbarProps) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <nav className="fixed left-0 right-0 top-0 z-header hidden h-20 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm md:block">
      <div className="flex h-full items-center justify-between px-10">
        <h2 className="cursor-pointer" onClick={() => onNavigate("/home")}>
          <img
            src={dcomLogo}
            alt="DCOM Logo"
            className="mr-2 inline-block w-20 flex-shrink-0"
          />
        </h2>

        <div className="flex items-center gap-20 whitespace-nowrap">
          <ul className="flex flex-row items-center gap-10 text-sm">
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

            <li className="flex items-center gap-6">
              {profileMenu}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
