import PageBackButton from "./ui/PageBackButton";

type DetailQueryErrorProps = {
  message: string;
  fallbackPath: string;
};

export default function DetailQueryError({
  message,
  fallbackPath,
}: DetailQueryErrorProps) {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <PageBackButton fallbackPath={fallbackPath} />
      <p className="py-16 text-center text-sm text-red-500" role="alert">
        {message}
      </p>
    </div>
  );
}
