import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';

import { useParams } from 'react-router-dom';
import {
  getCourseWithProgress,
  toggleLectureCompletion as toggleLectureCompletionApi,
} from '../services';
import { CourseWithProgressResponse } from '../types';

type Chapter = CourseWithProgressResponse['chapters'][0];
interface LearningContextType {
  chapters: Chapter[];
  markLectureComplete: () => void;
  nextLectureId: () => string | undefined;
  prevLectureId: () => string | undefined;
  getCourseCompletionPercentage: () => number;
  isCurrentLectureCompleted: () => boolean;
}

const LearningContext = createContext<LearningContextType | null>(null);

export function LearningContextProvider({ children }: { children: ReactNode }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [courseId, setCourseId] = useState('');

  const { lectureId, courseTitle } = useParams() as {
    lectureId: string;
    courseTitle: string;
  };

  const courseLectures = chapters?.flatMap((chapter) => chapter.lectures);

  const markLectureComplete = async () => {
    setChapters((prev) =>
      prev.map((chapter) => ({
        ...chapter,
        lectures: chapter.lectures.map((lecture) =>
          lecture._id === lectureId
            ? { ...lecture, isCompleted: !lecture.isCompleted }
            : lecture
        ),
      }))
    );
    try {
      await toggleLectureCompletionApi(courseId, lectureId);
    } catch (error) {
      setChapters((prev) =>
        prev.map((chapter) => ({
          ...chapter,
          lectures: chapter.lectures.map((lecture) =>
            lecture._id === lectureId
              ? { ...lecture, isCompleted: !lecture.isCompleted }
              : lecture
          ),
        }))
      );
      console.log(error);
    }
  };

  const isCurrentLectureCompleted = (): boolean => {
    const lecture = courseLectures.find((lecture) => lecture._id === lectureId);
    if (!lecture) return false;
    return lecture?.isCompleted;
  };

  const nextLectureId = (): string | undefined => {
    const currentLectureIndex = courseLectures.findIndex(
      (lecture) => lecture._id === lectureId
    );

    const nextLectureId = courseLectures[currentLectureIndex + 1];

    return nextLectureId?._id || undefined;
  };

  const prevLectureId = (): string | undefined => {
    const currentLectureIndex = courseLectures.findIndex(
      (lecture) => lecture._id === lectureId
    );

    const nextLectureId = courseLectures[currentLectureIndex - 1];

    return nextLectureId?._id || undefined;
  };

  const getCourseCompletionPercentage = (): number => {
    const numOfCompletedLectures = courseLectures.reduce((acc, curr) => {
      return curr.isCompleted ? acc + 1 : acc;
    }, 0);

    const numOfLectures = courseLectures.length;

    return Math.round((numOfCompletedLectures / numOfLectures) * 100);
  };

  useEffect(() => {
    getCourseWithProgress(
      courseTitle
        .split('-')
        .filter((a) => a !== '-')
        .join(' ')
    )
      .then(({ data }) => {
        setChapters(data.chapters);
        setCourseId(data._id);
      })
      .catch((err) => console.log(err));
  }, [courseTitle]);

  const value = {
    chapters,
    markLectureComplete,
    nextLectureId,
    prevLectureId,
    getCourseCompletionPercentage,
    isCurrentLectureCompleted,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearningContext() {
  const learningContext = useContext(LearningContext);
  if (!learningContext) {
    throw new Error(
      'useLearningContext must be used within a LearningContextProvider'
    );
  }
  return learningContext;
}
