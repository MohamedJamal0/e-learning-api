import { forwardRef } from 'react';

interface LecturesListProps {
  children: React.ReactNode;
}

const LecturesList = forwardRef(({ children }: LecturesListProps, ref: any) => {
  return (
    <ul ref={ref} className="space-y-4">
      {children}
    </ul>
  );
});

export default LecturesList;
