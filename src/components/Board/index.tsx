"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { memo, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type Props = {
  user: KindeUser;
};

const Board = ({ user }: Props) => {
  // Manage the state of board here
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );
  useEffect(() => {
    getBoard(user.id);
  }, [getBoard, user]);
  console.log("board", board);
  const handleOnDragEnd = (result: DropResult) => {
    try {
      const { destination, source, type } = result;
      console.log("source: ", source);
      console.log("destination: ", destination);
      console.log("type: ", type);

      if (!destination) return;

      // Handle column drag
      if (type === "column") {
        const enteries = Array.from(board.columns.entries());
        const [removed] = enteries.splice(source.index, 1);
        enteries.splice(destination.index, 0, removed);
        const rearrangedColumns = new Map(enteries);
        setBoardState({ ...board, columns: rearrangedColumns });
      }

      // ** Handle Card Drag
      const columns = Array.from(board.columns);
      const startColOld = columns[Number(source.droppableId)];
      const finishColOld = columns[Number(destination.droppableId)];
      const startCol: Column = {
        id: startColOld[0],
        todos: startColOld[1].todos,
      };
      const finishCol: Column = {
        id: finishColOld[0],
        todos: finishColOld[1].todos,
      };
      if (!startCol || !finishCol) return;
      // If drag and drop in exact same position then do nothing
      if (startCol === finishCol && source.index === destination.index) return;

      const newTodos = startCol.todos;
      const [todoToMove] = newTodos.splice(source.index, 1);

      const newColumns = new Map(board.columns);
      if (startCol.id === finishCol.id) {
        newTodos.splice(destination.index, 0, todoToMove);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        newColumns.set(startCol.id, newCol);
      } else {
        const finishTodos = finishCol.todos;
        finishTodos.splice(destination.index, 0, todoToMove);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });
        updateTodoInDB(todoToMove, finishCol.id);
      }

      // Update in Db
      setBoardState({ ...board, columns: newColumns });
    } catch (error) {
      console.error("Error in handleOnDragEnd", error);
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto px-5 md:px-0 py-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(Board);
