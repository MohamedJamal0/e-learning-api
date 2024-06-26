import { cn } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export default function Input({
  type,
  id,
  name,
  label,
  placeholder,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn('relative mb-4', className)}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        className={cn(
          'py-4 px-3.5 w-full rounded-md border hover:border-black focus:outline-indigo-600 placeholder:opacity-0 focus:placeholder:opacity-100',
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-0 translate-x-3.5 translate-y-4 text-gray-500 cursor-text"
      >
        {label}
      </label>
    </div>
  );
}
