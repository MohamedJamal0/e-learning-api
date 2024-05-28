import { Link } from 'react-router-dom';
import Accordion from '../../../components/ui/Accordion';
import { IoMdLock } from 'react-icons/io';
import { CgLoadbarDoc } from 'react-icons/cg';
import { CourseDetailsResponse } from '../types';

interface CourseChaptersProps {
  chapters: CourseDetailsResponse['chapters'][0][];
  courseTitle: string;
}
export default function CourseChapters({
  courseTitle,
  chapters,
}: CourseChaptersProps) {
  return (
    <div>
      {chapters?.map((chapter, index) => (
        <Accordion key={chapter._id} isOpen={true}>
          <Accordion.Toggle className="flex w-full items-center justify-between py-3 pl-4 pr-12 ">
            <div className=" text-lg font-medium text-blue-950">
              <span>{index + 1}. </span>
              <span>{chapter.title}</span>
            </div>
            <div className="text-sm">
              <span>{chapter.lectures.length} lectures</span>
              <span></span>
            </div>
          </Accordion.Toggle>
          <Accordion.Body>
            <ul className="flex flex-col">
              {chapter.lectures.map((lecture) => (
                <li key={lecture._id}>
                  <Link
                    className="flex items-center justify-between px-9 py-2.5 text-indigo-800 hover:bg-slate-100"
                    to={`/learning/${courseTitle
                      .split(' ')
                      .join('-')}/lecture/${lecture._id}`}
                  >
                    <div className="flex items-center gap-4">
                      {lecture.isFree ? (
                        <CgLoadbarDoc className="w-6 h-6 " />
                      ) : (
                        <IoMdLock className="w-6 h-6 " />
                      )}
                      <span>{lecture.title}</span>
                    </div>
                    <span className=" hidden sm:block">
                      {Math.floor(lecture.duration / 60)
                        .toString()
                        .padStart(2, '0')}
                      :
                      {Math.floor(lecture.duration % 60)
                        .toString()
                        .padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion>
      ))}
    </div>
  );
}
