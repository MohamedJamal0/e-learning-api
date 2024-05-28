import { useState } from 'react';
import toast from 'react-hot-toast';
import { attendFreeCourse as attendFreeCourseApi } from '../services';
import { useAuthContext } from '../../../features/authentication/context/authContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function useAttendFreeCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const { courseTitle } = useParams();
  const navigate = useNavigate();

  const attendFreeCourse = async (courseId: string, firstLecture: string) => {
    if (!user) return toast.error('Please login to continue');
    if (user.role == 'admin')
      return toast.error('Admin cannot attend to courses');
    setIsLoading(true);
    try {
      await attendFreeCourseApi(courseId);
      navigate(`/learning/${courseTitle}/lecture/${firstLecture}`);
    } catch (err) {
      toast.error('Failed to attend free course');
    } finally {
      setIsLoading(false);
    }
  };

  return { attendFreeCourse, isLoading };
}
