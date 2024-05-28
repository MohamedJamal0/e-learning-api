import toast from 'react-hot-toast';
import { createCourse as createCourseApi } from '../services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function useCreateCourse() {
  const [isLoading] = useState(false);

  const navigate = useNavigate();
  const createCourse = async () => {
    try {
      const { data: course } = await createCourseApi();
      console.log(course);
      navigate(`course/${course.courseId}/manage`);
    } catch (error) {
      toast.error('Failed to create course');
    }
  };

  return { createCourse, isCreating: isLoading };
}
