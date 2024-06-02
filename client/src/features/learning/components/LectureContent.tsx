import Spinner from '../../../components/ui/Spinner';
import { useLearningContext } from '../context/learningContext';
import useLectureContent from '../hooks/useLectureContent';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseContent() {
  const { data, isLoading } = useLectureContent();
  const {
    nextLectureId,
    prevLectureId,
    markLectureComplete,
    isCurrentLectureCompleted,
  } = useLearningContext();

  const navigate = useNavigate();

  const { courseTitle } = useParams();

  if (isLoading) {
    return (
      <div className="aspect-video flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  let content;

  if (!data || !data?.videoUrl) {
    content = (
      <div className="relative">
        <div className=" aspect-video bg-black blur-sm"></div>
        <button
          onClick={() => navigate(`/course/${courseTitle}`)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-md text-white bg-blue-500 z-50"
        >
          Get Unlimted Access To Videos
        </button>
      </div>
    );
  } else {
    content = (
      <div onContextMenu={(e) => e.preventDefault()}>
        <video
          className="w-full h-full aspect-video"
          controls
          controlsList="nodownload"
          disablePictureInPicture
          src={data.videoUrl}
          autoPlay
        ></video>
      </div>
    );
  }

  const handleNavigateNext = () => {
    navigate(`/learning/${courseTitle}/lecture/${nextLectureId()}`);
  };
  const handleNavigatePrev = () => {
    navigate(`/learning/${courseTitle}/lecture/${prevLectureId()}`);
  };

  return (
    <div>
      <h1 className="mb-4 font-medium text-3xl ">{data?.title}</h1>
      {content}
      <div className=" flex items-center justify-between flex-wrap gap-3 p-5 mt-8 mb-8 rounded-md bg-gray-300">
        <div className="flex items-center">
          <input
            onChange={markLectureComplete}
            type="checkbox"
            className="w-6 h-6 mr-2"
            checked={isCurrentLectureCompleted()}
          />
          <p className="font-medium ">Mark lecture as completed</p>
        </div>
        <div>
          <button
            onClick={handleNavigatePrev}
            disabled={!prevLectureId()}
            className="py-1.5 px-4 mr-1 rounded-sm font-medium shadow-md bg-gray-100 "
          >
            Prev
          </button>
          <button
            onClick={handleNavigateNext}
            disabled={!nextLectureId()}
            className="py-1.5 px-4 bg-gray-100 rounded-sm shadow-md font-medium "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
