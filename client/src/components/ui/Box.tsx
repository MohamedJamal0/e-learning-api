export default function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full bg-gray-100 rounded p-5 mb-5 ${className}`}>
      {children}
    </div>
  );
}
