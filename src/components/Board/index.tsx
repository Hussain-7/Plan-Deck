"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { memo, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "./Column";

type Props = {};

const Board = (props: Props) => {
  // Manage the state of board here
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log("board", board);
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log("result", destination, source, type);

    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      console.log("board here", board, board.columns.entries());
      const enteries = Array.from(board.columns.entries());
      console.log("enteries", enteries);
      const [removed] = enteries.splice(source.index, 1);
      console.log("removed", removed);
      enteries.splice(destination.index, 0, removed);
      console.log("enteries", enteries);
      const rearrangedColumns = new Map(enteries);
      console.log("rearrangedColumns", rearrangedColumns);
      setBoardState({ ...board, columns: rearrangedColumns });
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
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
