interface SwitchProps {
  onChange: (value: boolean) => void;
  value: boolean;
  isDisabled?: boolean;
}

export default function Switch({
  onChange,
  value,
  isDisabled = false,
}: SwitchProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`flex w-10 h-5  rounded-full transition-all duration-500  ${
        value ? 'bg-green-500' : 'bg-gray-400'
      }`}
      disabled={isDisabled}
    >
      <span
        className={`shadow-lg w-1/2 h-full bg-white rounded-full transition-all duration-500 ${
          value ? 'ml-5' : ''
        }`}
      ></span>
    </button>
  );
}
