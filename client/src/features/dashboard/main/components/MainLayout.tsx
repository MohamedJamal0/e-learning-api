import useAdminCourses from '../../courses/hooks/useAdminCourses';
import Stats from './Stats';
import CourseTable from '../../courses/components/CourseTable';
import TransactionTable from './PurchasesTable';
import usePurchases from '../hooks/usePurchases';
import useAnalytics from '../hooks/useAnalytics';
import PageLoading from '../../../../components/ui/PageLoading';
import DashboardHeader from './DashboardHeader';

export default function MainLayout() {
  const { purchases, purchasesLoading } = usePurchases();
  const { adminCourses, adminCoursesLoading } = useAdminCourses();
  const { analytics, analyticsLoading } = useAnalytics();

  if (purchasesLoading || adminCoursesLoading || analyticsLoading)
    return <PageLoading />;

  return (
    <div>
      <DashboardHeader />
      <div className=" pb-32 mt-10 max-w-7xl px-[2%] mx-auto">
        <Stats analytics={analytics} />
        <div className="flex flex-wrap gap-14 mt-14  ">
          <CourseTable courses={adminCourses} />
          {/* <LastJoinedStudentDataChart data={lastJoinedStudentsData} /> */}
        </div>
        <TransactionTable purchases={purchases} />
        <div className="grid grid-cols-2"></div>
      </div>
    </div>
  );
}
