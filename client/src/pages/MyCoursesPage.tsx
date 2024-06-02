import Header from '../components/Header';
import MaxWidthContainer from '../components/ui/MaxWidthContainer';
import StudentCoursesProvider from '../features/courses/components/StudentCoursesProvider';

export default function MyCoursesPage() {
  return (
    <div>
      <Header />
      <main>
        <MaxWidthContainer className="py-10">
          <StudentCoursesProvider />
        </MaxWidthContainer>
      </main>
    </div>
  );
}
