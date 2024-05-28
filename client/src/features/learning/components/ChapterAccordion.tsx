import { IoMdLock } from 'react-icons/io';
import Accordion from '../../../components/ui/Accordion';
import { useParams } from 'react-router-dom';
import { PiCheckCircleBold } from 'react-icons/pi';
import { CourseWithProgressResponse } from '../types';
import { useLearningSidebarToggle } from '../context/learningSidebarToggleContext';
import { useNavigate } from 'react-router-dom';

type Chapter = CourseWithProgressResponse['chapters'][0];
export default function ChapterAccordion({ chapter }: { chapter: Chapter }) {
  const { lectureId, courseTitle } = useParams();

  const { toggleSidebar } = useLearningSidebarToggle();

  const navigate = useNavigate();

  const handleOnClick = (lectureId: string) => {
    if (window.innerWidth < 1024) toggleSidebar();
    navigate(`/learning/${courseTitle}/lecture/${lectureId}`);
  };

  return (
    <Accordion isOpen={true}>
      <Accordion.Toggle className="flex items-center justify-between w-full py-6 pl-5 pr-2.5 cursor-pointer">
        <h3 className="font-medium text-lg">{chapter.title}</h3>
      </Accordion.Toggle>
      <Accordion.Body>
        <ul className="flex flex-col py-2.5  overflow-hidden">
          {chapter.lectures.map((lecture) => (
            <li
              onClick={() => handleOnClick(lecture._id)}
              className={`flex items-center gap-5 py-3 pl-5 pr-2.5 cursor-pointer  hover:bg-gray-200/100 ${
                lecture._id === lectureId ? 'bg-gray-200/100' : ''
              }`}
              key={lecture._id}
            >
              <div>
                {lecture.isFree ? (
                  <PiCheckCircleBold
                    className={`w-6 h-6 ${
                      lecture.isCompleted ? 'text-green-500' : 'text-gray-400'
                    }`}
                  />
                ) : (
                  <IoMdLock className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <h4 className="text-lg">{lecture.title}</h4>
            </li>
          ))}
        </ul>
      </Accordion.Body>
    </Accordion>
  );
}
