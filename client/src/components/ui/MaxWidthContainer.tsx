import React from 'react';
import { cn } from '../../utils';

interface MaxWidthContainerProps {
  children: React.ReactNode;
  className?: string;
}
const MaxWidthContainer = ({ children, className }: MaxWidthContainerProps) => {
  return (
    <div className={cn('max-w-7xl mx-auto px-[2%]', className)}>{children}</div>
  );
};

export default MaxWidthContainer;
