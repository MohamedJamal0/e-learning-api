import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { LastJoinedStudentsDataResponse } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LastJoinedStudentDataChartProps {
  data: LastJoinedStudentsDataResponse[];
}

export const LastJoinedStudentDataChart = ({
  data,
}: LastJoinedStudentDataChartProps) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const labels = data?.map((item) => months[item.month - 1]);
  const counts = data?.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Students Joined Last 6 Months',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="flex-1">
      <Line data={chartData} />
    </div>
  );
};
