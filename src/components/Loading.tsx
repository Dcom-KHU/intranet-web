export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      
      <div className="flex flex-col items-center gap-3">
        
        {/* Spinner */}
        <div
          className="
            w-10 h-10
            rounded-full
            border-4
            border-gray-200
            border-t-blue-400
            animate-spin
          "
        />

        <p className="text-sm text-gray-500">
          Loading...
        </p>

      </div>

    </div>
  );
}