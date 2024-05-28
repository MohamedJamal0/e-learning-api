import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useLecturesContext } from '../context/lecturesContext';
import LecturesList from './LectureList';
import LectureItem from './LectureItem';
import { LectureResponse } from '../types';

interface SortableLecturesProps {
  lectures: LectureResponse[];
}

const SortableLectures = ({ lectures }: SortableLecturesProps) => {
  const { updateLectureOrder } = useLecturesContext();
  const dragEnded = (param: any) => {
    const { source, destination } = param;
    updateLectureOrder(source.index, destination.index);
  };
  return (
    <div className="px-12 mt-4">
      <DragDropContext onDragEnd={dragEnded}>
        <Droppable droppableId="lectures-wrapper">
          {(provided) => (
            <LecturesList ref={provided.innerRef}>
              {lectures.map((lecture, index) => {
                return (
                  <Draggable
                    draggableId={`comment-${lecture._id}`}
                    index={index}
                    key={lecture._id}
                  >
                    {(_provided) => (
                      <LectureItem
                        ref={_provided.innerRef}
                        dragHandleProps={_provided.dragHandleProps}
                        {..._provided.draggableProps}
                        lecture={lecture}
                        index={index}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </LecturesList>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SortableLectures;
