import toast from 'react-hot-toast';
import { publishCourse as publishCourseApi } from '../services';
import { handleAxiosError } from '../../../../utils';

export default function usePublishCourse(courseId: string) {
  const publishCourse = async () => {
    try {
      await publishCourseApi(courseId);
    } catch (err: any) {
      const error = handleAxiosError(err);

      if (error.status === 400)
        toast.error('course is already purchased you cannot unpublish it');

      if (error.status === 401) toast.error(`${error.message}`);
      else toast.error('something went wrong');

      throw error;
    }
  };

  return { publishCourse };
}
