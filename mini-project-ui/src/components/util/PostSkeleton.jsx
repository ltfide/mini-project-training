import Skeleton from "../core/Skeleton";

const PostSkeleton = () => {
   return (
      <div className="container mx-auto pt-14">
         <div className="flex justify-between flex-wrap">
            <div className="w-[70%] border-r-[1px] pr-[4rem] mt-6 py-3">
               <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-32 rounded" />
               </div>
               <div className="mt-8">
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-5 w-[95%] rounded my-4" />
                  <Skeleton className="h-5 w-[98%] rounded" />
                  <Skeleton className="h-5 w-[93%] rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-[95%] rounded my-4" />
                  <Skeleton className="h-5 w-[98%] rounded" />
                  <Skeleton className="h-5 w-[93%] rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-[95%] rounded my-4" />
                  <Skeleton className="h-5 w-[98%] rounded" />
                  <Skeleton className="h-5 w-full rounded my-4" />
               </div>
            </div>
            <div className="w-[30%] pl-6">
               <div className="mt-10 py-3">
                  <Skeleton className="h-8 w-full rounded-full" />
                  <Skeleton className="h-5 w-40 rounded mt-7" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
                  <Skeleton className="h-5 w-full rounded my-4" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default PostSkeleton;
