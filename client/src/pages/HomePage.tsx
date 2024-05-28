import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CoursesProvider from '../features/courses/components/CoursesProvider';
  
export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="w-full h-10 px-[2%] py-2 font-medium bg-yellow-100">
        <Link to="/dashboard/login">click here to go to dashboard</Link>
      </div>
      <div className="py-10 px-[2%] max-w-[1200px] mx-auto">
        <div className="text-center">
          <h1 className="font-semibold text-4xl mb-8">Logoipsum Courses</h1>
          <div className="w-[250px] mx-auto h-1.5 rounded-md bg-blue-400"></div>
          <p className=" py-7 text-lg font-medium">
            Explore all the courses on our platform
          </p>
        </div>
        <CoursesProvider />
      </div>
    </div>
  );
}
