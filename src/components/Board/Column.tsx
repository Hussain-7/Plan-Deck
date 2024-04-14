import React, { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: Props) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshop) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshop) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshop.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 rounded-full font-semibold text-xs bg-gray-200 w-6 h-6 flex items-center justify-center">
                    {todos.length}
                  </span>
                </h2>
                {todos.map((todo, index) => (
                  <div key={todo.$id} className="bg-white p-2 rounded mt-2">
                    <h3 className="text-sm font-semibold">{todo.title}</h3>
                    <p className="text-xs">{todo.description}</p>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default memo(Column);
