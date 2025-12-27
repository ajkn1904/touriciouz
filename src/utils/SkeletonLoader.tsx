export default function SkeletonLoader() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse h-[400px] border border-gray-200">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-5">
      <div className="h-6 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="flex gap-4 mb-4">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
  );
}