import { PurchaseResponse } from '../types';
import { format } from 'date-fns';

interface PurchaseRowProps {
  purchase: PurchaseResponse;
}

export default function PurchasesRow({ purchase }: PurchaseRowProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {purchase.transactionId}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {format(purchase.purchaseDate, 'dd/MM/yyyy')}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {purchase.student.firstName} {purchase.student.lastName}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {purchase.course.title}
      </td>

      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-blue-500 ">
        ${purchase.grossAmount}
      </td>
      <td className="px-6 py-4 font-medium text-red-500 whitespace-nowrap ">
        $ {purchase.fee}
      </td>
      <td className="px-6 py-4 font-medium text-green-500 whitespace-nowrap ">
        $ {purchase.netAmount}
      </td>
    </tr>
  );
}
