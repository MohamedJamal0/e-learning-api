import { deleteCourse as deleteCourseApi } from '../services';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { handleAxiosError } from '../../../../utils';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useDeleteCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const deleteCourse = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCourseApi(id);
      toast.success('Course deleted successfully');
      navigate('/dashboard');
    } catch (err) {
      const error = handleAxiosError(err as AxiosError);
      if (error.status === 400) toast.error(`${error.message}`);
      if (error.status === 401) toast.error(`${error.message}`);
      else toast.error('Failed to delete course');
    }
    setIsLoading(false);
  };

  return { deleteCourse, isDeleting: isLoading };
}
