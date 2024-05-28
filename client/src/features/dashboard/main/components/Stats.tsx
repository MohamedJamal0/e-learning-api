import StatsBox from './StatsBox';
import { HiOutlineUsers, HiOutlineDocumentText } from 'react-icons/hi2';
import { PiCurrencyCircleDollarLight } from 'react-icons/pi';
import { AnalyticsResponse } from '../types';

interface StatsProps {
  analytics: AnalyticsResponse;
}

export default function Stats({ analytics }: StatsProps) {
  return (
    <div className="flex flex-wrap gap-5">
      <StatsBox
        color="blue"
        label="Courses"
        value={analytics.numberOfCourses}
        icon={<HiOutlineUsers className="w-8 h-8" />}
      />
      <StatsBox
        color="yellow"
        label="Students"
        value={analytics.numberOfStudents}
        icon={<HiOutlineDocumentText className="w-8 h-8" />}
      />
      <StatsBox
        color="purple"
        label="Sales"
        value={analytics.numberOfPurchases}
        icon={<PiCurrencyCircleDollarLight className="w-8 h-8" />}
      />
      <StatsBox
        color="green"
        label="Incomes"
        value={`$ ${analytics.totalIncome}`}
        icon={<PiCurrencyCircleDollarLight className="w-8 h-8" />}
      />
    </div>
  );
}
