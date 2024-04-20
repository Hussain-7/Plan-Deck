import { databases, storage, ID } from "@/config/appwrite";
import { getTodosGroupedByColumn, uploadImage } from "@/lib/helpers";
import { create } from "zustand";

const initTask: TaskType = {
  title: "",
  type: "todo",
  description: "",
  image: undefined,
};

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
  addTask: (task: TaskInput) => void;
  newTaskInput: TaskType;
  setTaskInput: (taskInput: TaskType) => void;
  resetTaskInput: () => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  // Handling Searching
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  // Handle Task Form
  newTaskInput: initTask,
  setTaskInput: (taskInput) =>
    set({
      newTaskInput: { ...get().newTaskInput, ...taskInput },
    }),

  resetTaskInput: () =>
    set({
      newTaskInput: {
        ...initTask,
      },
    }),

  // Handle Board State Logic
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);

    // delete TodoId from new Columns
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  addTask: async ({ title, type, description, image }) => {
    let file: Image | undefined;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title,
        status: type,
        ...(description && { description }),
        ...(file && { image: JSON.stringify(file) }),
      }
    );
    // to clear new state input
    get().resetTaskInput();

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: title || "something",
        status: type || "todo",
        ...(description && { description }),
        ...(file && { image: file }),
      };

      const column = newColumns.get(type);
      if (column) {
        column.todos.push(newTodo);
      } else {
        newColumns.set(type, { id: type, todos: [newTodo] });
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
