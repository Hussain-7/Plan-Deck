"use client";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

type Props = {};

const Board = (props: Props) => {
  // Manage the state of board here
  return (
    <DragDropContext
      onDragEnd={(result) => {
        // Handle the drag and drop event here
      }}
    >
      <Droppable droppableId="board" direction="horizontal" type="colummn">
        {(provided) => (
          <div>{/* Render the todo, inprogress and done column here */}</div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
