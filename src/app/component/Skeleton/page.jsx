import React from 'react';

const Skeleton = ({ className }) => (
  <div className={`bg-skeleton-gradient bg-[length:200%_200%] animate-wave ${className}`}></div>
);

const SkeletonCard = () => (
  <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-96 backdrop-blur-sm rounded-2xl border-2 border-gray-500 duration-500">
    <div className="block relative h-48 rounded overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="mt-4">
      <div className="flex items-center gap-4 h-14 border-b">
        <Skeleton className="w-10 h-10 rounded-full ring-2 ring-gray-500" />
        <Skeleton className="w-1/3 h-6" />
      </div>
      <Skeleton className="mt-4 w-1/2 h-6" />
      <Skeleton className="mt-2 w-3/4 h-4" />
    </div>
  </div>
);

export default SkeletonCard;