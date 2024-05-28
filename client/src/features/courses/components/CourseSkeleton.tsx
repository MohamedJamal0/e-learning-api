import Skeleton from '../../../components/ui/Skeleton';

export default function CourseSkeleton() {
  return (
    <div className="bg-white rounded-md shadow-md">
      <Skeleton style="rounded-t-md h-40 w-full" />
      <div className="p-3">
        <Skeleton style="w-[60%] h-[20px] mb-2" />
        <Skeleton style="w-[80%] h-[20px]" />
      </div>
      <div className="px-3 py-4 flex justify-between items-end flex-1 ">
        <Skeleton style="w-[60px] h-[30px]" />
        <Skeleton style="w-[80px] h-[30px]" />
      </div>
    </div>
  );
}
