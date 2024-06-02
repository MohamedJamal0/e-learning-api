import { cn } from '../../utils';

export default function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={cn('bg-gray-200 animate-pulse', className)}
    ></div>
  );
}
