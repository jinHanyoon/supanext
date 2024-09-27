export default function SkeletonCard({ isGridView }) {
  return (
    <div className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md ${
      isGridView ? 'flex flex-col' : 'flex flex-row h-full'
    }`}>
      <div className={`bg-skeleton-gradient bg-wave-background animate-wave ${
        isGridView ? 'w-full aspect-[4/3]' : 'flex-shrink-0 w-1/3 sm:w-1/4'
      }`}>
        <div className={isGridView ? '' : 'w-full pt-[75%]'}></div>
      </div>
      <div className={`p-4 sm:p-5 ${isGridView ? 'flex-grow' : 'flex-grow w-2/3 sm:w-3/4 flex flex-col justify-between'}`}>
        {!isGridView && (
          <div className="h-6 bg-skeleton-gradient bg-wave-background animate-wave rounded w-3/4 mb-2"></div>
        )}
        <div className={`flex items-center ${isGridView ? 'mt-2' : 'mt-auto'}`}>
          <div className="w-8 h-8 bg-skeleton-gradient bg-wave-background animate-wave rounded-full mr-3"></div>
          <div>
            <div className="h-4 bg-skeleton-gradient bg-wave-background animate-wave rounded w-24 mb-1"></div>
            <div className="h-3 bg-skeleton-gradient bg-wave-background animate-wave rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}