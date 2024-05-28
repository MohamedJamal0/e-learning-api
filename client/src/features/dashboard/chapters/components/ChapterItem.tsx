import DeleteChapter from './DeleteChapter';
import { CiFileOn } from 'react-icons/ci';
import UpdateChapterModal from './UpdateChapterModal';
import { RiDraggable } from 'react-icons/ri';
import Accordion from '../../../../components/ui/Accordion';
import { forwardRef } from 'react';
import PublishChapter from './PublishChapter';
import { ChapterWithLectures } from '../types/chapter';
import SortableLectures from '../../lectures/components/SortableLectures';
import CreateLecture from '../../lectures/components/CreateLecture';

interface ChapterItemProps {
  chapter: ChapterWithLectures;
  index: number;
  dragHandleProps: any;
}

const ChapterItem = forwardRef(
  (
    { chapter, index, dragHandleProps, ...props }: ChapterItemProps,
    ref: any
  ) => {
    return (
      <li ref={ref} {...props} className={'border border-rounded '}>
        <Accordion isOpen={false}>
          <Accordion.Toggle className="flex items-center gap-2 p-6 ">
            <h2 className="text-lg font-medium ">Chapter {index + 1}:</h2>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CiFileOn className="w-6 h-6 " />
                <span>{chapter.title}</span>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                <UpdateChapterModal
                  chapterId={chapter._id}
                  title={chapter.title}
                />
              </div>

              <DeleteChapter chapterId={chapter._id} />
              <div className="flex flex-1 items-center justify-end">
                <div onClick={(e) => e.stopPropagation()}>
                  <PublishChapter
                    chapterId={chapter._id}
                    isPublished={chapter.isPublished}
                  />
                </div>

                <span {...dragHandleProps}>
                  <RiDraggable className={'w-5 h-5 ml-2 mr-4 cursor-move '} />
                </span>
              </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Body>
            <div className="px-6">
              <SortableLectures lectures={chapter.lectures} />
              <CreateLecture chapterId={chapter._id} />
            </div>
          </Accordion.Body>
        </Accordion>
      </li>
    );
  }
);

export default ChapterItem;
