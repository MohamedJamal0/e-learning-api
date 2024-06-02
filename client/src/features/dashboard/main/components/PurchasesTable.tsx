import { PurchaseResponse } from '../types';
import PurchasesRow from './PurchasesRow';

interface PurchasesTableProps {
  purchases: PurchaseResponse[];
}

export default function PurchasesTable({ purchases }: PurchasesTableProps) {
  return (
    <div className="mt-14  ">
      <div className="flex items-start justify-between mb-8 ">
        <h2 className="text-lg font-semibold">My Transactions</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full max-h-[500px] overflow-auto text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Student
              </th>

              <th scope="col" className="px-6 py-3">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                Gross Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Fee
              </th>
              <th scope="col" className="px-6 py-3">
                Net Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases?.map((purchase) => (
              <PurchasesRow key={purchase._id} purchase={purchase} />
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
