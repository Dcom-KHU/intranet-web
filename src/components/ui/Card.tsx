type CardProps = {
    title: string;
    children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
    return (
        <div
            className="
                border
                p-6
                rounded-lg
                shadow-md
                bg-white
                hover:shadow-xl
                transition-all
                duration-300
            "
        >
            <h2 className="text-xl font-bold mb-4">
                {title}
            </h2>

            {children}
        </div>
    );
};

export default Card;