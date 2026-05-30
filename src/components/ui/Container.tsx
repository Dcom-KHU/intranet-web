import type { IconType } from "react-icons";
import { IoChevronForward } from "react-icons/io5";

type ContainerProps = {
    title: string;
    icon?: IconType;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    onViewAllClick?: () => void;
    showViewAll?: boolean; 
};

// hover:bg-[#f0f8ff]

const Container = ({
    title,
    icon: Icon, 
    children,
    variant = "primary",
    onViewAllClick,
    showViewAll = true,
}: ContainerProps) => {
    const variants = {
        primary: `
            border
            p-6
            rounded-2xl
            space-y-3
            shadow-md
            bg-white
            hover:shadow-xl
            transition-all
            duration-300
            text-[#0F2854]
            whitespace-nowrap
        `,
        secondary: `
            border
            border-[#B5D4F4]
            p-6
            rounded-2xl
            space-y-3
            bg-white
            transition-all
            duration-300
            text-[#0F2854]
            whitespace-nowrap
        `,
    };
    return (
        <div
            className={variants[variant]}
        >
            <h2 className="text-lg mb-4 flex items-center">
                {Icon && <Icon className="w-4 mr-2 inline-block" />}
                <p className="font-bold">{title}</p>
                    
                {showViewAll && (
                    <span 
                        onClick={onViewAllClick}
                        className="flex items-center text-sm text-gray-400 hover:text-[#B5D4F4] ml-auto cursor-pointer "
                    >
                        View all
                        <IoChevronForward className="ml-1 group-hover:text-[#B5D4F4]" />
                    </span>
                )}
            </h2>

            {children}
        </div>
    );
};

export default Container;