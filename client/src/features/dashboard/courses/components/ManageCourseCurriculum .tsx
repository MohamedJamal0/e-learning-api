import CreateChapter from '../../chapters/components/CreateChapter';
import { useLecturesContext } from '../../lectures/context/lecturesContext';
import { useChaptersContext } from '../../chapters/context/chaptersContext';
import SortableChapters from '../../chapters/components/SortableChapters';
import Spinner from '../../../../components/ui/Spinner';

export default function ManageCourseCurriculum() {
  const { chapters, loading: loadingChapters } = useChaptersContext();
  const { lectures, loading: loadingLectures } = useLecturesContext();

  const loading = loadingChapters || loadingLectures;

  const chaptersWithLectures = chapters.map((chapter) => {
    const chapterWithLectures = {
      ...chapter,
      lectures: lectures.filter((lecture) => lecture.chapter === chapter._id),
    };
    return chapterWithLectures;
  });

  return (
    <div>
      <div className=" py-6 px-12 border-b">
        <h1 className="text-3xl font-medium">Curriculum</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-12">
          <SortableChapters chapters={chaptersWithLectures} />
          <CreateChapter />
        </div>
      )}
    </div>
  );
}
