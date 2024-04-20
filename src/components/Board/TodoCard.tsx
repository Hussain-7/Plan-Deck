import { getImageUrl } from "@/lib/helpers";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { getURL } from "next/dist/shared/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
  draggableProps: DraggableProvidedDraggableProps;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask]);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getImageUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5 pr-3">
        <div className="flex flex-col gap-4 items-start justify-center">
          <p className="font-semibold">
            {todo.title}
            {todo?.description && (
              <div className="w-[30%] border-b border-black/30 pt-2" />
            )}
          </p>
          {/* h */}

          {todo?.description && (
            <p className="text-gray-400">{todo.description}</p>
          )}
        </div>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-6 w-6" />
        </button>
      </div>

      {imageUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
