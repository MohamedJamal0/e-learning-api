import useAttendFreeCourse from '../hooks/useAttendFreeCourse';

interface AttendFreeCourseProps {
  courseId: string;
  firstLecture: string;
  user: any;
}

export default function AttendFreeCourse({
  courseId,
  firstLecture,
  user,
}: AttendFreeCourseProps) {
  const { attendFreeCourse, isLoading } = useAttendFreeCourse();

  return (
    <div>
      <button
        disabled={isLoading || !user || user.role !== 'student'}
        onClick={() => attendFreeCourse(courseId, firstLecture)}
        className="w-full mt-3 mb-2 py-2.5 rounded-md bg-blue-950 text-white font-medium hover:opacity-90"
      >
        {isLoading ? 'Loading...' : 'Enroll Now'}
      </button>
      {user && user?.role !== 'student' && (
        <p className="text-red-500  text-sm ">
          Admin cannot subscribe, please log out
        </p>
      )}
      {!user && (
        <p className="text-indigo-500 font-medium ">Login to subscribe</p>
      )}
    </div>
  );
}
