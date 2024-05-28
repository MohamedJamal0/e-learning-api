import { ReactNode } from 'react';

interface StatsBoxProps {
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink';
  icon: ReactNode;
  label: string;
  value: number | string;
}

export default function StatsBox({ color, icon, label, value }: StatsBoxProps) {
  const colors = {
    blue: 'bg-blue-300',
    green: 'bg-green-300',
    red: 'bg-red-300',
    yellow: 'bg-yellow-300',
    purple: 'bg-purple-300',
    orange: 'bg-orange-300',
    pink: 'bg-pink-300',
  };
  return (
    <div
      className={`flex-1 basis-60 flex items-center gap-3 p-5 rounded-md shadow-md`}
    >
      <div
        className={` flex items-center justify-center w-16 h-full rounded-md ${colors[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
