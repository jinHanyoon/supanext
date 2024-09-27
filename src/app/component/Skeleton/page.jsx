import React from 'react';

const Skeleton = ({ className }) => (
  <div className={`bg-skeleton-gradient bg-wave-background animate-wave ${className}`}></div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
    <div className="relative w-full pt-[75%]">
      <Skeleton className="absolute inset-0" />
    </div>
    <div className="p-4">
      <Skeleton className="w-3/4 h-5 mb-2" />
      <Skeleton className="w-1/2 h-5 mb-4" />
      <div className="flex items-center">
        <Skeleton className="w-8 h-8 rounded-full mr-2" />
        <Skeleton className="w-1/3 h-4" />
      </div>
    </div>
  </div>
);


export default SkeletonCard;