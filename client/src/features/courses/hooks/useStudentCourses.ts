import useFetch from '../../../hooks/useFetch';
import { StudentCourseResponse } from '../types';
import { getStudentCourses } from '../services';
import { useNavigate } from 'react-router-dom';

export default function useStudentCourses() {
  const { data, isLoading, error } =
    useFetch<StudentCourseResponse[]>(getStudentCourses);

  const navigate = useNavigate();

  if (error) {
    navigate('/');
  }

  return { studentCourses: data as StudentCourseResponse[], isLoading };
}
