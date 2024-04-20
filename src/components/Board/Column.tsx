import React, { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

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
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const [openModal]=useModalStore((state) => [state.openModal])
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
                    {searchString
                      ? todos?.filter((todo) =>
                          todo?.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length
                      : todos.length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos
                    ?.filter((todo) =>
                      todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                    .map((todo, index) => (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                          />
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}

                <div className="flex items-center justify-end p-2">
                  <button className="text-green-500 hover:text-green-600">
                    <PlusCircleIcon onClick={openModal} className="h-8 w-8" />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default memo(Column);
