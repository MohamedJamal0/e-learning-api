import { CiFileOn } from 'react-icons/ci';
import { LectureResponse } from '../types';
import DeleteLecture from './DeleteLecture';
import { RiDraggable } from 'react-icons/ri';
import LectureArticleModal from './LectureArticleModal';

import UpdateLectureModal from './UpdateLectureModal';
import PublishLecture from './PublishLecture';
import { forwardRef } from 'react';
import LectureVideo from './LectureVideo';

interface LectureItemProps {
  lecture: LectureResponse;
  index: number;
  dragHandleProps: any;
}

const LectureItem = forwardRef(
  (
    { lecture, index, dragHandleProps, ...props }: LectureItemProps,
    ref: any
  ) => {
    return (
      <li
        ref={ref}
        {...props}
        className="flex-1 px-4 py-3 rounded-md border border-black bg-white group"
      >
        <div className="flex items-center gap-2 flex-wrap ">
          <div className="mr-2">Lecture {index + 1}:</div>
          <div className="flex items-center gap-1">
            <CiFileOn className="w-6 h-6 " />
            <span>{lecture.title}</span>
          </div>
          <DeleteLecture chapterId={lecture.chapter} lectureId={lecture._id} />
          <div className="flex-[1] flex items-center justify-end gap-2">
            <UpdateLectureModal lecture={lecture} lectureId={lecture._id} />
            <LectureVideo videoUrl={lecture.videoUrl} lectureId={lecture._id} />
            <LectureArticleModal
              lectureId={lecture._id}
              article={lecture.article}
            />
            <PublishLecture
              lectureId={lecture._id}
              isPublished={lecture.isPublished}
              isDisabled={false}
            />
            <span {...dragHandleProps}>
              <RiDraggable className={'w-5 h-5  cursor-move '} />
            </span>
          </div>
        </div>
      </li>
    );
  }
);

export default LectureItem;

