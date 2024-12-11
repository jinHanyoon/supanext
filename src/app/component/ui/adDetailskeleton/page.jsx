export default function DetailSkeleton() {
    return (
      <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
        <div className="p-6 md:p-8">
          <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
            <div className='h-8 bg-gray-200 rounded w-2/3'></div>
          </div>
          <div className='space-y-6'>
            <div className="relative aspect-[3/2] w-full bg-gray-200 rounded-lg"></div>
            <div className='space-y-4'>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              <div className='h-4 bg-gray-200 rounded w-4/6'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }