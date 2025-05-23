export default function DataSkeleton({ isGridView }) {
  return (
      <div className={`bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md ${
          isGridView ? 'flex flex-col h-full' : 'flex flex-row h-full'  // h-full 추가
      }`}>
          <div className={isGridView ? 'w-full relative' : 'flex-shrink-0 w-1/3 sm:w-1/4'}>
              <div className={`relative bg-gray-200 animate-pulse ${
                  isGridView ? 'aspect-[4/3]' : 'w-full pt-[100%]'
              }`} />
          </div>
          <div className={`p-4 sm:p-5 flex flex-col ${  // flex flex-col 추가
              isGridView ? 'flex-grow' : 'flex-grow w-2/3 sm:w-3/4'
          }`}>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
              {!isGridView && (
                  <>
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                  </>
              )}
              <div className="flex items-center mt-auto">  {/* mt-auto 추가 */}
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-3" />
                  <div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1" />
                  </div>
              </div>
          </div>
      </div>
  );
}