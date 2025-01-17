import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonComp = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-24 w-96" />
        <Skeleton className="h-24 w-96" />
        <Skeleton className="h-24 w-96" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-24 w-96" />
        <Skeleton className="h-24 w-96" />
        <Skeleton className="h-24 w-96" />
      </div>
    </div>
  );
};

export default SkeletonComp;
