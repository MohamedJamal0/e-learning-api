import { LectureProvider } from '../../lectures/context/lecturesContext';
import { ChapterProvider } from '../../chapters/context/chaptersContext';
import ManageCourseCurriculum from './ManageCourseCurriculum ';

export default function CourseManageCurriculumProvider() {
  return (
    <ChapterProvider>
      <LectureProvider>
        <ManageCourseCurriculum />
      </LectureProvider>
    </ChapterProvider>
  );
}
