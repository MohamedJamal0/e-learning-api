import Header from '../components/Header';
import MaxWidthContainer from '../components/ui/MaxWidthContainer';
import CoursesProvider from '../features/courses/components/CoursesProvider';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <MaxWidthContainer className="py-10">
          <section className="text-center">
            <h1 className="font-semibold text-4xl mb-8">SkillForge Courses</h1>
            <div className="w-[250px] mx-auto h-1.5 rounded-md bg-indigo-400"></div>
            <p className=" py-7 text-lg font-medium">
              Explore all the courses on our platform
            </p>
          </section>
          <section>
            <CoursesProvider />
          </section>
        </MaxWidthContainer>
      </main>
    </>
  );
}
