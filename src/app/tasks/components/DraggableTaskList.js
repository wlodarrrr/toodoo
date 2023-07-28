import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function DraggableTaskList({ handleDragEnd, taskViews }) {
  return (
    <DragDropContext className="m-2" onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div className="h-100 overflow-y-scroll p-3">
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list-group list-group-flush gap-1"
            >
              {taskViews.map((taskView, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {taskView}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
