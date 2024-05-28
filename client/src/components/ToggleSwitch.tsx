interface CheckProps {
  value: boolean;
  onToggle: () => void;
}

export default function ToggleSwitch({ value, onToggle }: CheckProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-6 h-6 rounded-full border ${value ? 'bg-green-300' : ''}`}
    ></button>
  );
}
