import { forwardRef } from 'react';

interface ChaptersListProps {
  children: React.ReactNode;
}

const ChaptersList = forwardRef(({ children }: ChaptersListProps, ref: any) => {
  return (
    <ul ref={ref} className="space-y-4">
      {children}
    </ul>
  );
});

export default ChaptersList;
