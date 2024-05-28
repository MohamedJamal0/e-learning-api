import { useParams } from 'react-router-dom';
import { updateCourse as updateCourseApi } from '../services';
import { UpdateCourseResponse } from '../types';
import { useState } from 'react';
import toast from 'react-hot-toast';
export default function useUpdateCourse() {
  const [isLoading, setIsLoading] = useState(false);

  const { courseId } = useParams();

  const updateCourse = async (course: UpdateCourseResponse) => {
    setIsLoading(true);
    try {
      await updateCourseApi(courseId as string, course);
      toast.success('Course updated successfully');
    } catch (error) {
      toast.error('Failed to update course');
    }
    setIsLoading(false);
  };

  return { updateCourse, isUpdating: isLoading };
}
