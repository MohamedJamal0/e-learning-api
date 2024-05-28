import Header from '../components/Header';
import StudentCoursesProvider from '../features/courses/components/StudentCoursesProvider';

export default function MyCoursesPage() {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto py-20 px-[5%]">
        <StudentCoursesProvider />
      </div>
    </div>
  );
}
