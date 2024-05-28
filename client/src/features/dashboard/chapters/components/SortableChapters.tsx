import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useChaptersContext } from '../context/chaptersContext';

import ChaptersList from './ChaptersList';
import ChapterItem from './ChapterItem';
import { ChapterWithLectures } from '../types/chapter';

interface SortableChaptersProps {
  chapters: ChapterWithLectures[];
}

const SortableChapters = ({ chapters }: SortableChaptersProps) => {
  const { updateChapterOrder } = useChaptersContext();

  const dragEnded = (param: any) => {
    const { source, destination } = param;
    updateChapterOrder(source.index, destination.index);
  };
  return (
    <div>
      <div>
        <DragDropContext onDragEnd={dragEnded}>
          <Droppable droppableId="chapters-wrapper">
            {(provided) => (
              <ChaptersList ref={provided.innerRef}>
                {chapters.map((chapter, index) => {
                  return (
                    <Draggable
                      draggableId={`comment-${chapter._id}`}
                      index={index}
                      key={chapter._id}
                    >
                      {(_provided) => (
                        <ChapterItem
                          ref={_provided.innerRef}
                          dragHandleProps={_provided.dragHandleProps}
                          {..._provided.draggableProps}
                          chapter={chapter}
                          index={index}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ChaptersList>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default SortableChapters;
